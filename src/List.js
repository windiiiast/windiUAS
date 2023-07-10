import React from "react";


export default function List({ data, handleEdit, handleDelete }) {
    return (
        <div className="text-center">
            <table align="center">
                {
                    data.map((contact) => {
                        return (
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Nim</th>
                                        <th>Email</th>
                                        <th>Telp</th>
                                        <th>Tanggal</th>
                                        <th>Alamat</th>
                                        <th class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="m-3">
                                        <td>{contact.name}</td>
                                        <td>{contact.nim}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.telp}</td>
                                        <td>{contact.tanggal}</td>
                                        <td>{contact.alamat}</td>
                                        <td>
                                            <button onClick={() => handleEdit(contact.id)} className="btn btn-primary m-3">Edit</button>
                                            <button onClick={() => handleDelete(contact.id)} className="btn btn-danger m-3">Del</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    })
                }
            </table>
        </div >
    );
}