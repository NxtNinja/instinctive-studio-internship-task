import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Loader, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import axios from "axios";
import useStudentsStore from "@/stores/useStudentsStore";

interface DeleteStudentButtonProps {
  id: string;
  setIsDialogOpen: (open: boolean) => void;
}

const DeleteStudentButton: FC<DeleteStudentButtonProps> = ({
  id,
  setIsDialogOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const { fetchStudents } = useStudentsStore();

  const deleteStudent = async (studentId: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/deleteStudent/${studentId}`);
      if (response.status === 204) {
        fetchStudents();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"destructive"}
          className="font-bold text-lg border-gray-400 border"
        >
          {loading ? <Loader className="animate-spin" /> : <Trash2 />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => deleteStudent(id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudentButton;
