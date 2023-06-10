import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchNote, updateNote } from "../store/api/NoteSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [currenValue, setCurrentValue] = useState([]);

  const params = useParams();

  const selectedNote = useSelector((state) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNote());
  }, [dispatch]);

  useEffect(() => {
    const note = selectedNote.find((note) => note.id === Number(params.id));

    if (note) {
      setCurrentValue(note);
    }
  }, [selectedNote, params.id]);

  const initialValues = {
    title: currenValue.title,
    content: currenValue.content,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      updateNote({
        id: Number(params.id),
        values: values,
      })
    ).then(() => {
      navigate("/");
      window.location.reload();
    });
    resetForm();
  };

  return (
    <div className="bg-blue-600 min-h-[100vh] flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">Update Note</h3>
          <div className="p-6 w-[60%] bg-white rounded" id="form-box">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              <Form>
                <div className="mb-5">
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="title"
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-5">
                  <Field
                    as="textarea"
                    name="content"
                    placeholder="body"
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                  <ErrorMessage
                    name="content"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full bg-yellow-400 text-white font-bold p-4 rounded-lg hover:bg-yellow-500">
                  Update Note
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
