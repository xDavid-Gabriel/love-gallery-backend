import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra"


//Obtener Post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Crear Post
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath)

      image = {
        url:result.secure_url,
        public_id:result.public_id
      }
      
    }

    const newPost = new Post({ title, description, image });

    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
     let post = await Post.findById(req.params.id)
     await deleteImage(post.image.public_id);
     // TODO: validar req.body antes de actualizar

     // si se sube una nueva imagen subirla a cloudinary
     if (req.files?.image) {
    
       const result = await uploadImage(req.files.image.tempFilePath);
       await fs.remove(req.files.image.tempFilePath);
      // agregue la nueva imagen al req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
     const updatePost = await Post.findByIdAndUpdate(id, {$set:req.body},  {
      new: true,
    });
  console.log(updatePost);
    return res.send(updatePost).json(updatePost);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



//Borrar Post
export const deletePost = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);

    if (!postRemoved) return res.sendStatus(404);
    if(postRemoved.image.public_id){
      await deleteImage(postRemoved.image.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Traer un solo post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.sendStatus(404);

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
