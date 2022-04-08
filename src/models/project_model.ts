import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Create a interface representing a document in MongoDB
interface IProject {
  name: string;
  description: string;
}

// Create a schema corresponding to the document interface
const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

// Create a model
const ProjectModel = model<IProject>("Project", projectSchema);
export default ProjectModel