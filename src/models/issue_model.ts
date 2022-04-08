import { Schema, Types, model } from 'mongoose';

// Create a interface representing a document in MongoDB
interface IIssue {
  title: string;
  description?: string;
  status?: string;
  projectId?: Types.ObjectId;
}

// Create a schema corresponding to the document interface
const issueSchema = new Schema<IIssue>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: {
    type: String,
    required: false,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required:true }
});

// Create a model
export const IssueModel = model<IIssue>("Issue", issueSchema);
export default IssueModel;
