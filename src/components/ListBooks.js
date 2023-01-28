import React, { useState } from "react";

import "../assets/styles/buttons.css";

import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/action/actionTypes";
import CustomModal from "./CustomModal";

const ListBooks = () => {
  const dispatch = useDispatch();
  const { booksState, categoriesState } = useSelector((state) => state);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [willDeleteBook, setWillDeleteBook] = useState("");

  const deleteBook = (id) => {
    dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK_FAIL,
          payload: "Silerken bir hata oluştu",
        });
      });
  };
  return (
    <>
      <table className="table table-striped my-5">
        <thead>
          <tr>
            <th scope="col">Sira No</th>
            <th scope="col">Adi</th>
            <th scope="col">Yazar</th>
            <th scope="col">Kategori</th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {booksState.books.map((book, index) => {
            /* let myCategory=null
                for(let i=0; i<categoriesState.categories.length;i++){
                     if(categoriesState.categories[i].id === book.categoryId){
                        myCategory=categoriesState.categories[i]
                    }
                } */
            // Yukarıdaki yorum satırı uzun yolu aşağıdaki ise kısa yolu
            const myCategory = categoriesState.categories.find(
              (item) => item.id === book.categoryId
            );

            return (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setWillDeleteBook(book.id);
                    }}
                    className="generalBtn deleteBtn"
                  >
                    Sil
                  </button>
                  <button className="generalBtn editBtn">Güncelle</button>
                  <button className="generalBtn detailBtn">Detay</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showDeleteModal === true && (
        <CustomModal
          title="Silinecek"
          message="Silmek İstediğinden Eminmisin"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            deleteBook(willDeleteBook);
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default ListBooks;
