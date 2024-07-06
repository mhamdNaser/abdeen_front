import React from "react";
import axiosClient from "../../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../contexts/ContextsProvider";

function LanguageTable(props) {
    const { myLanguage, getLanguage, selectLang } = props;
    const { translation } = useStateContext();
    const navigated = useNavigate();

    const handleDelete = (Id) => {
        axiosClient.get(`/admin/language/delete/${Id}`).then(() => {
            getLanguage();
        });
    };

    const handleupdate = (id) => {
        axiosClient.get(`/admin/language/update_default/${id}`).then(() => {
            getLanguage();
        })
    }

    const handleshow = (id) => {
        selectLang(id)
    }

    const handleEdit = (slug) => {
        navigated(`/admin/EditWord?slug=${slug}`);
    };

    return (
        <>
            <h1 className="text-3xl border-b border-[lightgray] py-3">
                {'All Languages' in translation ? translation['All Languages'] : translation['All Languages']}
            </h1>
            <table className="text-left my-5">
                <thead className="border-b border-[gray]">
                    <tr>
                        <th className="py-1">ID</th>
                        <th className="py-1">Name</th>
                        <th className="py-1">Direction</th>
                        <th className="py-1">Slug</th>
                        <th className="py-1">Status</th>
                        <th className="py-1">Default</th>
                        <th className="py-1 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myLanguage &&
                        myLanguage.map((language, index) => (
                            <tr key={index}>
                                <td className="border-b border-[lightgray] py-2 w-[5%]">
                                    {language.id}
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[25%]">
                                    <div className="truncate w-[160px]">{language.name}</div>
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[10%]">
                                    {language.direction}
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[10%]">
                                    {language.slug}
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[10%]">
                                    {language.status}
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[15%]">
                                    {language.default === 0 ? (
                                        <button
                                            className="border p-1 bg-[red] text-[white]"
                                            onClick={() => {
                                                handleupdate(language.id);
                                            }}
                                        >
                                            Make Default
                                        </button>
                                    ) : (
                                        <button
                                            className="border p-1 bg-[green] text-[white]"
                                            onClick={() => {
                                                handleupdate(language.id);
                                            }}
                                        >
                                            Is Default
                                        </button>
                                    )}
                                </td>
                                <td className="border-b border-[lightgray] py-2 w-[35%] text-center space-x-1">
                                    <button
                                        className="bg-gray-600 border p-1"
                                        onClick={() => {
                                            handleDelete(language.id);
                                        }}
                                    >
                                        delete
                                    </button>
                                    <button className="bg-gray-600 border p-1"
                                        onClick={() => {
                                            handleEdit(language.slug);
                                        }}
                                    >Edit Words</button>
                                    <button className="bg-gray-600 border p-1"
                                        onClick={() => {
                                            handleshow(language.id);
                                        }}
                                    >Edit</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default LanguageTable;
