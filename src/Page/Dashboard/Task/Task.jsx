import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// step-1: dnd
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hook/useAuth';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Task = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  // step-2: dnd
  // const handleDragEnd = result => {
  //   if (!result.destination) return;

  //   const { source, destination } = result;
  //   const updatedTasks = [...tasks];
  //   const movedTask = updatedTasks.splice(source.index, 1)[0];
  //   movedTask.status = 'To-do';

  //   if (destination.droppableId === 'ongoing') {
  //     movedTask.status = 'Ongoing';
  //   } else if (destination.droppableId === 'complete') {
  //     movedTask.status = 'Complete';
  //   }

  //   updatedTasks.splice(destination.index, 0, movedTask);
  //   setTasks(updatedTasks);
  // };
  const handleDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!result.destination) return;

    console.log(draggableId);
    console.log(result.droppableId);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async data => {
    const taskData = {
      ...data,
      deadlines: data.date.toLocaleDateString(),
      email: user.email,
      status: 'To-do',
    };
    console.log(taskData);
    axiosSecure.post('/tasks', taskData).then(res => {
      console.log(res.data);
      reset();
      refetch();
      if (res.data.insertedId) {
        toast.success('Task added Successfully!');
      }
    });
    // console.log('clicked');
  };

  const { refetch, data: taskData = [] } = useQuery({
    queryKey: ['task', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.email}`);
      return res.data;
    },
  });
  console.log(taskData);

  // const handleEdit = _id => {
  //   console.log(_id);
  // };
  const handleDelete = _id => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${_id}`).then(res => {
          console.log(res.data);
          if (res?.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <div className="w-11/12 mx-auto">
      <h3 className="text-3xl font-semibold">
        Your submitted work is {taskData.length}
      </h3>
      {/* <DragDropContext onDragEnd={handleDragEnd}> add korchi */}
      {/* */}
      <div className="lg:flex flex-col">
        <div className="">
          <form
            className="card-body flex lg:flex-row rounded-lg"
            style={{ backgroundColor: '#0a3d62' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">
                  Title
                </span>
              </label>
              <input
                type="title"
                {...register('title', { required: true })}
                placeholder="enter your title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-white">
                  Description
                </span>
              </label>
              <input
                type="description"
                {...register('description', { required: true })}
                placeholder="enter your description"
                className="input input-bordered"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text font-semibold text-white">
                  Deadlines
                </span>
              </label>

              <Controller
                control={control}
                name="date"
                className=""
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={date => field.onChange(date)}
                    minDate={new Date()}
                    className="w-full rounded-lg px-4 py-3 outline-0"
                  />
                )}
                rules={{ required: true }}
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-semibold text-white">
                  Priority
                </span>
              </label>
              <select
                {...register('priority', { required: true })}
                className=" w-full px-6 py-3 text-black rounded-lg"
                name="priority"
                id=""
                defaultValue="default"
              >
                <option disabled value="default"></option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate </option>
                <option value="High">High</option>
              </select>
              {errors.occupation && (
                <span className="text-red-400">Priority is required</span>
              )}
            </div>

            <div className="form-control mt-6 flex items-center justify-center">
              <button className="btn btn-primary" type="submit">
                Task Add
              </button>
            </div>
          </form>
        </div>
        <div className=" grid lg:grid-cols-3 grid-cols-1">
          <div>
            <h3 className="text-2xl font-semibold">To Do List</h3>
            {/* <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todo">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskData
                      .filter(item => item.status === 'To-do')
                      .map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={`todo-${item._id}`}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex gap-5 px-5 py-4"
                            >
                              
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext> */}

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="todo">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskData.map((item, index) => (
                      <Draggable
                        key={item?._id}
                        draggableId={item?._id}
                        // draggableId="todo"
                        index={index}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex gap-5 px-5 py-4 "
                          >
                            <div
                              className="grid grid-cols-1 w-full px-4 py-4 rounded-lg"
                              style={{ backgroundColor: '#0a3d62' }}
                            >
                              <div className="flex gap-3">
                                <h3 className="text-white">{item.title}</h3>
                                <h3 className="flex-1 text-white">
                                  {item.description}
                                </h3>
                              </div>
                              <div className="grid grid-cols-2">
                                <div>
                                  {' '}
                                  <h3 className="text-white">{item.status}</h3>
                                  <h3 className="text-white">
                                    {item.deadlines}
                                  </h3>
                                </div>
                                <div className=" flex gap-4">
                                  <Link to={`edit/${item._id}`}>
                                    <button className="btn ">
                                      <CiEdit />
                                    </button>
                                  </Link>
                                  {/* <button
                                    onClick={() => handleEdit(item._id)}
                                    className="btn "
                                  >
                                    <CiEdit />
                                  </button> */}
                                  <button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn"
                                  >
                                    <MdDelete />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {/* <div>
            <h3 className="text-2xl font-semibold">Ongoing Task</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="ongoing">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskData
                      .filter(item => item.status === 'Ongoing')
                      .map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={`todo-${item._id}`}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex gap-5 px-5 py-4"
                            >
                              
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div> */}

          <div>
            <h3 className="text-2xl font-semibold">Ongoing task</h3>
          </div>

          {/* <div>
            <h3 className="text-2xl font-semibold">Complete Task</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="complete">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks
                      .filter(item => item.status === 'Complete')
                      .map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={`todo-${item._id}`}
                          index={index}
                        >
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex gap-5 px-5 py-4"
                            ></div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div> */}
          <div>
            <h3 className="text-2xl font-semibold">Complete Task</h3>
          </div>
        </div>
      </div>
      {/* </DragDropContext> */}
    </div>
  );
};

export default Task;
