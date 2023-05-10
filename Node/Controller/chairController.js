const { postChairsModel, getChairsModel, getChairsByIdModel } = require("../Model/chairModel");

  const postChairsContorller = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    const body = req?.body;
    const profile = req?.file?.filename;
  
    try {
      const data = await postChairsModel({ body, profile });
      res.send(data);
    } catch (err) {
      console.log("ERROR=>",err);
      res.send(err);
    }
  };
  
  const getChairsContorller = async (req, res) => {
    try {
      const data = await getChairsModel();
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  };

  const getChairsContorllerById = async (req, res) => {
      const { id } = req?.params;
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Max-Age", "1800");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET"
      );
      const data = await getChairsByIdModel(id);
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  };
  
  module.exports = {
    postChairsContorller,
    getChairsContorller,
    getChairsContorllerById,
  };
  