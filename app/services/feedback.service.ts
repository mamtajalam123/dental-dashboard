import { feedbackAPI } from "./feedback.api";

import { Feedback } from "@/app/types/feedback";



export const feedbackService = {


  getFeedbacks: async()=>{

    return await feedbackAPI.getAll();

  },



  getFeedbackById: async(
    id:number
  )=>{

    return await feedbackAPI.getById(id);

  },



  createFeedback: async(
    data:Partial<Feedback>
  )=>{

    return await feedbackAPI.create(data);

  },



  updateFeedback: async(
    id:number,
    data:Partial<Feedback>
  )=>{

    return await feedbackAPI.update(
      id,
      data
    );

  },



  deleteFeedback: async(
    id:number
  )=>{

    return await feedbackAPI.delete(id);

  }


};