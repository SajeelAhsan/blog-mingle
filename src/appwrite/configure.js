import conf from "../conf/config.js";
import { ID, Databases, Client, Storage, Query } from "appwrite";


export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setEndpoint(conf.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.bucket)
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }, // data

        [] // permissions
      );

    } catch (error) {
      console.log("Appwrite service :: create Post error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }, // data

        [] // permissions
      );

    } catch (error) {
      console.log("Appwrite service :: Update Post error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: Delete Post error", error);
      return false;
    }
  }
  async getDocument(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
      );
    } catch (error) {
      console.log("Appwrite service :: GET Post error", error);
      return false;
    }
  }
  async getPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: GET Post error", error);
      return false;
    }
  }

  //file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId, // bucketId
        ID.unique(), // fileId
        file,
      );
    }
    catch (error) {
      console.log("Appwrite service ::  Upload File error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId, // bucketId
        ID.unique(), // fileId
        fileId,
      );
      return true;
    }
    catch (error) {
      console.log("Appwrite service ::  Delete File error", error);
      return false;
    }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service();
export default service;