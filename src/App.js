import logo from './logo.svg';
import './App.css';
import List from "./List";
import { useState, useEffect } from 'react';
import { uid } from "uid";
import axios from 'axios';

function App() {

  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    email: "",
    telp: "",
    tanggal: "",
    alamat: "",
  });

  useEffect(() => {
    // mengambil data 

    // jalankan menggunakan json - server--watch db.json--port = 3004
    axios.get("http://localhost:3004/contacts").then((res) => {
      console.log(res.data);
      setContacts(res?.data ?? []);
    });

  }, []);

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // alert("success");

    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }

    if (formData.nim === "") {
      return false;
    }

    if (formData.email === "") {
      return false;
    }

    if (formData.telp === "") {
      return false;
    }

    if (formData.tanggal === "") {
      return false;
    }

    if (formData.alamat === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.nim = formData.nim;
          contact.email = formData.email;
          contact.telp = formData.telp;
          contact.tanggal = formData.tanggal;
          contact.alamat = formData.alamat;
        }
      });

      axios.put(`http://localhost:3004/contacts/${isUpdate.id}`, {
        name: formData.name,
        nim: formData.nim,
        email: formData.email,
        telp: formData.telp,
        tanggal: formData.tanggal,
        alamat: formData.alamat
      }).then((res) => {
        alert("Berhasil mengubah mahasiswa");
      });
    } else {
      let newData = {
        id: uid(),
        name: formData.name,
        nim: formData.nim,
        email: formData.email,
        telp: formData.telp,
        tanggal: formData.tanggal,
        alamat: formData.alamat
      };
      data.push(newData);

      axios.post("http://localhost:3004/contacts", newData).then((res) => {
        alert("Berhasil menambahkan mahasiswa");
      });
    }

    // bagian tambah isi

    setIsUpdate({ id: null, status: false });
    setContacts(data);
    setFormData({ name: "", nim: "", email: "", telp: "", tanggal: "", alamat: "", });
  }

  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({
      name: foundData.name,
      nim: foundData.nim,
      email: foundData.email,
      telp: foundData.telp,
      tanggal: foundData.tanggal,
      alamat: foundData.alamat,
    });
    setIsUpdate({ id: id, status: true });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter(contact => contact.id !== id);

    axios.delete(`http://localhost:3004/contacts/${id}`).then((res) => {
      alert("Berhasil menghapus mahasiswa");
    });

    setContacts(filteredData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">Data Mahasiswa</h1>

      <form onSubmit={handleSubmit} className="col-sm-6 offset-sm-3 mb-3">
        <div className="form-group">
          <label className='mb-2' htmlFor="">Nama Lengkap</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label className='mb-2' htmlFor="">NIM</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.nim} name="nim" />
        </div>
        <div className="form-group mt-3">
          <label className='mb-2' htmlFor="">Email</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.email} name="email" />
        </div>
        <div className="form-group mt-3">
          <label className='mb-2' htmlFor="">No. Telp</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.telp} name="telp" />
        </div>
        <div className="form-group mt-3">
          <label className='mb-2' htmlFor="">Tanggal</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.tanggal} name="tanggal" />
        </div>
        <div className="form-group mt-3">
          <label className='mb-2' htmlFor="">Alamat</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.alamat} name="alamat" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete}
        handleEdit={handleEdit}
        data={contacts} />
    </div>
  );
}

export default App;

