let { note_schema_validate } = require("../validators/validations");
let {noteService } = require('../services/index')
let {failResponse , successResponse} = require('../library/response_constants')

const controller = "[notes_controller]"
class Notes_Controller {
  async fetchAllUserNotes(req, res) {
    const method = "[fetchAllUserNotes]";
    let user , query , notes;
    try {
      user = req.user.loginUser;
      if (!user) {
        return res.status(400).send(failResponse.USER_NOT_EXISTS);
      }
      query = { user: user.id }
      notes = await noteService.find(query);
      return res.status(200).json(notes);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async createNewNote(req, res) {
    const method = "[createNewNote]";
    let user , query , created_note;
    try {
      await note_schema_validate.validateAsync(req.body);
      user = req.user.loginUser;
      if (!user) {
        return res.status(400).send(failResponse.USER_NOT_EXISTS);
      }
      query = {
        user: user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      }
      created_note = await noteService.create(query);
      return res.status(200).json(created_note);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async updaterUserNote(req, res) {
    const method = "[updaterUserNote]";
    let updateNote , query , note_to_update  ,updatednote;
    try {
      let note_id = req.params.id.trim();
      let { title, description, tag } = req.body;
      updateNote = {};

      if (title) updateNote.title = title;
      if (description) updateNote.description = description;
      if (tag) updateNote.tag = tag;
      query = { _id: note_id }
      note_to_update = await noteService.findOne(query);
     
      if (!note_to_update) {
        return res.status(404).send(failResponse.NOT_FOUND);
      }

      if (note_to_update.user.toString() !== req.user.loginUser.id) {
        return res.status(401).status(failResponse.INVALID_USER)
      }
      
      updatednote = await noteService.findByIdAndUpdate(note_id , { $set: updateNote },{ new: true });
      
      return res.status(200).json(updatednote);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async deleteUserNote(req, res) {
    const method = "[deleteUserNote]";
    let note_id , query , note_to_delete;
    try {
      note_id = req.params.id.trim();
      query = { _id: note_id }
      note_to_delete = await noteService.findById(query);

      if (!note_to_delete) {
        return res.status(404).send(failResponse.NOT_FOUND)
      }

      if (note_to_delete.user.toString() !== req.user.loginUser.id) {
        return res.status(401).status(failResponse.INVALID_USER);
      }

      await noteService.findByIdAndDelete(note_id);

      return res.status(200).json(successResponse.SUCCESS_DELETE);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
}

module.exports = Notes_Controller