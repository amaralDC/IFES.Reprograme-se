const express = require("express");
const ControllerVideo = require("../controllers/ControllerVideo");
const router = express.Router();

router.get("/VCadastrar", ControllerVideo.cadastrarVideo);
router.post("/VCadastrar", ControllerVideo.VideoCreate);
router.get("/V", ControllerVideo.listarVideos);
router.get("/Vupdate/:id_video", ControllerVideo.UpdateVideo);
router.post("/Vupdate", ControllerVideo.VideoUpdate);
router.post("/Vremover", ControllerVideo.removerVideo);

module.exports = router;