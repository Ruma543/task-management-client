import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskEdit = () => {
  // const [editTask, setEditTask] = useState({});
  const editTask = useLoaderData();
  const { title, description, priority, deadlines, _id } = editTask || {};
  const navigate = useNavigate();
  console.log(editTask);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  console.log(_id);
  const axiosSecure = useAxiosSecure();
  const onSubmit = async data => {
    console.log(data);

    const editData = {
      ...data,
      deadlines: data.date.toLocaleDateString(),
    };
    console.log(editData);
    axiosSecure
      .put(`/tasks/edit/${_id}`, editData)
      .then(res => {
        console.log(res.data);
        if (res?.data?.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: ' Date update successfully',
            showConfirmButton: true,
          });
          navigate('/dashboard/task');
        }
      })
      .catch(error => {
        console.error('An error occurred:', error);
        Swal.fire({
          icon: 'error',
          title: 'Something wrong',
          showConfirmButton: true,
        });
      });
  };
  return (
    <div>
      <form
        className="card-body flex lg:flex-row rounded-lg"
        style={{ backgroundColor: '#0a3d62' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-white">Title</span>
          </label>
          <input
            type="title"
            {...register('title', { required: true })}
            placeholder="enter your title"
            className="input input-bordered"
            defaultValue={title}
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
            defaultValue={description}
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
                defaultValue={deadlines}
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
            defaultValue={priority}
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
            Task Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
