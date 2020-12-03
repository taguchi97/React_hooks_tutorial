import React, { useState, useEffect } from 'react'
import "./App.css"
import { BookToRead } from "./BookToRead"
import BookRow from './BookRow'
import BookSearchItem from './BookSearchItem';
import { BookDescription } from './BookDescription';
import BookSearchDialog from './BookSearchDialog';
import Modal from 'react-modal'

Modal.setAppElement('#root')

const customStyles = {
  // overlay: {
  //   backgroundcolor: 'rgba(0,0,0,0.8)'
  // },
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)'
  }
}
const APP_KEY = 'react-hooks-tutorial'

const App = () => {
  const [books, setBooks] = useState<BookToRead[]>([])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  useEffect(()=>{
    const storeBooks = localStorage.getItem(APP_KEY)
    if (storeBooks) {
      setBooks(JSON.parse(storeBooks))
    }
  }, [])
    useEffect(()=>{
    localStorage.setItem(APP_KEY, JSON.stringify(books))
  },[books])

  const handleAddClick = () => {
    setModalIsOpen(true)
  }
  const handleModalClose = () => {
    setModalIsOpen(false)
  }
  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id)
    setBooks(newBooks)
  }
  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id === id
        ? { ...b, memo: memo }
        : b
    })
    setBooks(newBooks)
  }
  const onBookAdd = (b: BookDescription) => {
    const id = books.length + 1
    const newBook: BookToRead = {
      id: id,
      title: b.title,
      authors: b.authors,
      memo: ""
    }
    const newBooks: BookToRead[] = books.concat(newBook)
    setBooks(newBooks)
    console.log(newBooks)
  }
  const BookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={handleBookMemoChange}
        onDelete={handleBookDelete}
      />
    )
  })

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>本を追加</div>
      </section>
      <section className="main">
        {BookRows}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog onBookAdd={onBookAdd} maxResults={20}/> 
      </Modal>
    </div>
  );
};

export default App;
