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

const Task = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  // step-2: dnd
  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Implement logic to update task order in the corresponding lists
    // Use the index from source and destination to reorder the tasks array
  };
  // step-3
  // const onDrop = (item, monitor) => {
  //   console.log(item);
  // };

  // step-4
  // const [{ isDragging }, drag] = useDrag({
  //   type,
  //   collect: monitor => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  // step-5
  // const [, drop] = useDrop({
  //   accept: type,
  //   drop: onDrop,
  // });

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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'work add successfully',
          showConfirmButton: false,
          timer: 1500,
        });
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

  const handleEdit = _id => {
    console.log(_id);
  };
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
    // <DndProvider backend={HTML5Backend}>
    <div className="w-11/12 mx-auto">
      <h3>Your submitted work is {taskData.length}</h3>
      {/* <DragDropContext onDragEnd={handleDragEnd}> add korchi */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
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
                  <span className="label-text">Description</span>
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
                  <span className="label-text">Deadlines</span>
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
                      className="w-full rounded-lg px-4 py-2 outline-0"
                    />
                  )}
                  rules={{ required: true }}
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Priority</span>
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

              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Task Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <div>
              <h3 className="text-2xl font-semibold">To Do List</h3>
              <Droppable droppableId="todo">
                {provided => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskData.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex gap-5 px-5 py-4 "
                          >
                            <div className="grid grid-cols-2  bg-green-200">
                              <div className="flex">
                                {' '}
                                <h3>{item.title}</h3>
                                <h3>{item.description}</h3>
                              </div>
                              <div className="flex">
                                <h3>{item.status}</h3>
                                <h3>{item.deadlines}</h3>
                              </div>
                              <div className="flex">
                                <button
                                  onClick={() => handleEdit(item._id)}
                                  className="btn "
                                >
                                  <CiEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="btn"
                                >
                                  <MdDelete />
                                </button>
                              </div>
                            </div>
                            {/* <div className="flex">
                              <h3>{item.status}</h3>
                              <h3>{item.deadlines}</h3>
                              <button
                                onClick={() => handleEdit(item._id)}
                                className="btn "
                              >
                                <CiEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="btn"
                              >
                                <MdDelete />
                              </button>
                            </div> */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              ;
              {/* <div
              // ref={drop}
              >
                {taskData.map(item => (
                  <div
                    key={item._id}
                    // ref={drag}
                    className=" flex gap-5 px-5 py-4"
                  >
                    <div className="grid grid-cols-1">
                      <h3>{item.title}</h3>
                      <h3>{item.description}</h3>
                    </div>
                    <div className="flex">
                      <h3>{item.status}</h3>
                      <h3>{item.deadlines}</h3>
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="btn "
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Ongoing list</h3>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Ongoing list</h3>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
    // </DndProvider>
  );
};

export default Task;
