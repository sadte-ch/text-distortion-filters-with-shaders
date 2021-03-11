exports.convertWebmToMP4 = async function(req, res){
  // try{
  //   const webmFile = JSON.parse(req.body.webmFile)
  //
  //   // await fs.writeFile("file.mp4", Buffer.from(webmToMp4(await fs.readFile("file.webm"))));
  //
  //   const data = await fs.writeFile("file.mp4", Buffer.from(webmToMp4(webmFile)));
  //   res.status(200).json(data);
  // } catch {
  //   res.status(500).json({
  //     error:{
  //       name: error.name,
  //       message: error.message
  //     }
  //   })
  // }
}

exports.userUpdate = async function(req, res){
  try{
    const data = JSON.parse(req.body)
    console.log(data)
    res.status(200).json(data);
  } catch(err){
    res.status(500).json({
        err:{
        name: err.name,
        message: err.message
      }
    })
  }
}

exports.userWhereaboutsUpdate = async function(req, res){
  try{
    const data = JSON.parse(req.body)
    console.log(data)
    res.status(200).json(data);
  } catch(err){
    res.status(500).json({
        err:{
        name: err.name,
        message: err.message
      }
    })
  }
}
