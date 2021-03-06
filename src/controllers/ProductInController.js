const { Product_in, Product } = require("../models");

// const ProductController = require("./ProductOutController");

const response = {
  data: [],
  message: "",
  status: "",
};

class ProductInController {
  static async getProductIn(req, res) {
    try {
      const productInRes = await Product_in.findAll();
      response.data = productInRes;
      response.message = "Succes get Product-in data";
      response.status = "ok";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async getProductInById(req, res) {
    try {
      const productInRes = await Product_in.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      if (!productInRes) throw Error("data Product-in not found");
      response.data = productInRes;
      response.message = "Succes get data product-in  by id";
      response.status = "ok";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.message = "error get data product-in by id";
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async deleteProductInById(req, res) {
    try {
      const productInRes = await Product_in.findByPk(req.body.id);
      if (!productInRes) throw Error("delete data by id product-in  not found");
      await Product_in.destroy({ where: { id: req.body.id } });
      response.data = req.body.id;
      response.message = "Succes delete data product-in by id";
      res.status(200).json(response);
    } catch (error) {
      response.data = [];
      response.message = "error delete data product-in by id";
      response.status = "error";
      response.message = error.message;
      res.status(400).json(response);
    }
  }

  static async updateProductIn(req, res) {
    try {
      await Product_in.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      response.data = req.body;
      console.log(req.body);
      response.message = "Updated data Product-in by PUT success";
      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      response.data = [];
      response.status = "error update Product-in by PUT";
      response.message = error.message;
      res.status(400).json(response);
      console.log(error);
    }
  }

  static async createProductIn(req, res) {
    try {
      const product = await Product.findByPk(req.body.product_id);
      if (!product) {
        throw Error("product references not found");
      } else {
        console.log(product);
        let newStock = product.stock + req.body.total;
        await Product.update(
          { stock: newStock },
          {
            where: {
              id: req.body.product_id,
            },
          }
        );
      }
      await Product_in.create(req.body);
      response.data = req.body;
      response.message = "Input data product  success";
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

module.exports = ProductInController;
