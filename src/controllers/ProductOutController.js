const { Product_out, Product } = require("../models");

const response = {
  data: [],
  message: "",
  status: "",
};

class ProductOutController {
  static async getProductOut(req, res) {
    try {
      const ProductOutRes = await Product_out.findAll();
      response.data = ProductOutRes;
      response.message = "Succes get Product-out data";
      response.status = "ok";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async getProductOutById(req, res) {
    try {
      const ProductOutRes = await Product_out.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      if (!ProductOutRes) throw Error("data Product-out not found");
      response.data = ProductOutRes;
      response.message = "Succes get data Product-out  by id";
      response.status = "ok";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.message = "error get data Product-out by id";
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async deleteProductOutById(req, res) {
    try {
      const ProductOutRes = await Product_out.findByPk(req.body.id);
      if (!ProductOutRes)
        throw Error("delete data by id Product-out  not found");
      await Product_out.destroy({ where: { id: req.body.id } });
      response.data = req.body.id;
      response.message = "Succes delete data Product-out by id";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.message = "error delete data Product-out by id";
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async updateProductOut(req, res) {
    try {
      await Product_out.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      response.data = req.body;
      console.log(req.body);
      response.message = "Updated data Product-out by PUT success";
      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      response.data = [];
      response.status = "error update Product-out by PUT";
      response.message = error.message;
      res.status(400).json(response);
      console.log(error);
    }
  }

  static async createProductOut(req, res) {
    try {
      const product = await Product.findByPk(req.body.ProductId);
      if (!product) {
        throw Error("product references not found");
      } else {
        if (product.stock < req.body.total) {
          throw Error("not enough product for out");
        } else {
          let newStock = req.body.total - product.stock;
          await Product.update(
            { stock: newStock },
            {
              where: {
                id: req.body.ProductId,
              },
            }
          );
        }
      }
      await Product_out.create(req.body);
      response.data = req.body;
      response.message = "Out data product  success";
      response.status = "ok";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }
}

module.exports = ProductOutController;
