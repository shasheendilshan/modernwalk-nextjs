
import { get } from './api.services';
import { IResponse } from '@interfaces/global/global.interface';



export const getAllProducts = async () => {
    try {
      const allProducts = await get("/products");

      const response:IResponse= {
        data: allProducts.data,
        error: null,
        status:allProducts.status
      }   
      return response;
    } catch (error:any) {
     
      const response:IResponse = {
        data: [],
        error: error
      }  
      return response;
    }
  };


  export const getSpecificCategory = async (category:string, limit?:number) => {
    try {
      const allProducts = await get(
        `/products?category=${category}${
          limit ? "?limit=" + limit : ""
        }`
      );

     const response:IResponse = {
        data: allProducts.data,
        error: null
      }   
      return response;
    } catch (error:any) {
     
      const response:IResponse = {
        data: [],
        error: error
      }  
      return response;
    }
  };

  export const getProductById =async(id:number)=>{
    try {
      const Product = await get(`/products/${id}`);

      const response:IResponse= {
        data: Product.data,
        error: null,
        status:Product.status
      }   
      return response;
    } catch (error:any) {
     
      const response:IResponse = {
        data: [],
        error: error
      }  
      return response;
    }
  }
  
