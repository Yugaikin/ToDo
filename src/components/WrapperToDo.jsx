import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import FilterTasks from "../components/FilterTasks";
import Header from "../components/Header";
import Pagination from "./Pagination";
import { http } from "../api/http";
import PostList from "./PostList";

const WrapperToDo = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sorted, setSorted] = useState("asc");
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0)

  const getTasks = async () => {
    try {
      const response = await http.get(
        `/tasks/1?pp=5&page=${page}&order=${sorted}&filterBy=${filter}`
      );
      const arr = response.data.tasks;
      setPosts(arr);
    } catch (err) {
      alert(err);
    }
  };

  const postTasks = async (obj) => {
    try {
      const resp = await http.post("task/1", obj);
      console.log(resp);
    } catch (err) {
      alert(err, 1);
    }
  };

  const patchChangeTask = async (newValue, uuid) => {
    try {
      const resp = await http.patch(`/task/1/${uuid}`, { name: newValue });
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    getTasks();
  };

  const patchCheckTask = async (e, uuid) => {

    try {
      const resp = await http.patch(`/task/1/${uuid}`, {
        done: e.target.checked,
      });
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    getTasks();
   
    page===1 && setPage(1)
  };

  const deleteTasks = async (obj, uuid) => {
    try {
      const resp = await http.delete(`/task/1/${uuid}`, obj);
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    getTasks();
    posts.length === 1 && setPage(page - 1)
    page===1 && setPage(1)
  };

  const deleteAllTasks = async () => {
    const arr = posts.map(({ uuid }) => http.delete(`/task/1/${uuid}`));

    try {
      const resp = await Promise.all(arr);
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    getTasks();
  };

  const deleteCheckTasks = async () => {
    const arr = posts.filter((post) => post.done === true);
    const filterPosts = arr.map(({ uuid }) => http.delete(`/task/1/${uuid}`));

    try {
      const resp = await Promise.all(filterPosts);
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    
    getTasks();
    page===1 && setPage(1)
  };

  const deleteUncheckTasks = async () => {
    const arr = posts.filter((post) => post.done === false);
    const filterPosts = arr.map(({ uuid }) => http.delete(`/task/1/${uuid}`));

    try {
      const resp = await Promise.all(filterPosts);
      console.log(resp);
    } catch (err) {
      alert(err);
    }
    getTasks();
    page===1 && setPage(1)
  };

  const getPagination = async () =>{
      try{
          const response = await http.get(`/tasks/1?filterBy=${filter}`)
          const count = response.data.count
        setCountPage(Math.ceil(count / 5))
      } catch(err){
        alert(err)
      }
  }

  useEffect(() => {
    getTasks();
  }, [filter, sorted, page]);

  useEffect (()=>{
    getPagination();
    if (posts.length === 0 && page>1){
      setPage(page-1)
      }
  },[posts])

  useEffect(() => {setPage(1)}, [filter] )

  return (
    <div>
      <Header />
      <AddTask
        postTasks={postTasks}
        getTasks={getTasks}
        deleteAllTasks={deleteAllTasks}
        deleteCheckTasks={deleteCheckTasks}
        deleteUncheckTasks={deleteUncheckTasks}
      />
      <FilterTasks
        filter={filter}
        setFilter={setFilter}
        setSorted={setSorted}
      />
      <PostList
        posts={posts}
        setPosts={setPosts}
        patchCheckTask={patchCheckTask}
        patchChangeTask={patchChangeTask}
        deleteTasks={deleteTasks}
        getTasks={getTasks}
      />
      <Pagination amountTask={filter.length} page={page} setPage={setPage} countPage={countPage} />
    </div>
  );
};

export default WrapperToDo;