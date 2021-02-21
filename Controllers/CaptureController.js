const webmToMp4 = require("webm-to-mp4");

exports.convertWebmToMP4 = async function(req, res){
  try{
    const webmFile = JSON.parse(req.body.webmFile)

    // await fs.writeFile("file.mp4", Buffer.from(webmToMp4(await fs.readFile("file.webm"))));

    const data = await fs.writeFile("file.mp4", Buffer.from(webmToMp4(webmFile)));
    res.status(200).json(data);
  } catch {
    res.status(500).json({
      error:{
        name: error.name,
        message: error.message
      }
    })
  }
}
