import './App.css';
import React, { useEffect, useState} from 'react';
import NotesCard from './components/NotesCard/NotesCard';

function App() {
  const [notes, setNotes] = useState([])

  const [search, setSearch] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [idx, setIdx] = useState(0)
  function handleChange(e) {
    switch (e.target.id){
      case "search":
        setSearch(e.target.value)
        break
      case "title":
        if(title.length < 50){
          setTitle(e.target.value)
        }else{
          setTitle(e.target.value.slice(0, -1))
        }
        console.log(e)
        break
      case "body":
        setBody(e.target.value)
        break
      default:
        break
    }
  }
  function getDateFormat(date_time){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const event = new Date(date_time)
    return event.getUTCDate()+" "+monthNames[event.getUTCMonth()]+" "+event.getUTCFullYear();
  }
  function checkTidakAdaCatatan(isArsip) {
    let notesCopy = notes
    let result = 0
    if(notesCopy.length === 0){
      return "Tidak ada catatan"
    }
    notesCopy.forEach((note) => {
      if(note.archived === isArsip){
        result++
      }
    })
    if(result === 0){
      return "Tidak ada catatan"
    }
  }
  const handleRemoveItem = (e) => {
    let notesCopy = notes
    notesCopy.splice(e.target.id,1)
    setNotes([...notesCopy])
  }
  const handleArsipItem = (e) => {
    let notesCopy = notes
    notesCopy[parseInt(e.target.id)].archived = !notesCopy[parseInt(e.target.id)].archived
    setNotes([...notesCopy])
  }
  function handleSubmit(event) {
    event.preventDefault()
    let today = getDateFormat(new Date())
    let duplicate = false
    let notesCopy = notes
    notesCopy.forEach((note) => {
      if(note.title === title){
        duplicate = true
      }
    })
    if (!duplicate){
      notesCopy.push({
        id: idx,
        title: title,
        body: body,
        archived: false,
        createdAt: today
      })
      setIdx(idx+1)
      setNotes([...notesCopy])
      setTitle("")
      setBody("")
    }else{
      alert("data title kembar, data tidak disimpan")
    }
  }

  useEffect(() => {
  }, []);

  return (
    <main className="App">
        <section className="input_section">
          <h2>Masukkan Catatan Baru</h2>
          <form id="inputNotes" onSubmit={handleSubmit}>
            <div className="input">
              <div className='title-label'>
                <label htmlFor="title">Judul</label>
                <p>Sisa karakter :
                  <span>{50-title.length}</span>
                </p>
              </div>
              <input
                type="text"
                id="title"
                autoComplete="off"
                value={title}
                onChange={handleChange}
                placeholder='input judul'
                required
              />
            </div>
            <div className="input">
            <textarea
                id="body"
                value={body}
                onChange={handleChange}
                placeholder='input note'
                required
              />
            </div>
            <button type="submit">Tambah Note</button>
          </form>
        </section>
        
        <section className="search_section">
          <h2>Cari Catatan</h2>
          <form id="searchNotes">
            <label htmlFor="searchNotesTitle">Judul</label>
            <input
              type="text"
              id="search"
              autoComplete="off"
              value={search}
              onChange={handleChange}
              placeholder='cari catatan...'
            />
          </form>
        </section>
        
        <section className="notes_shelf">
          <h2>Catatan Aktif</h2>
          {
            notes ?
            notes.map((note, idx) => {
              return(
                !note.archived && (note.title.toLocaleLowerCase()).includes(search.toLocaleLowerCase()) ? 
                <NotesCard isArsip={note.archived} arsipNote={handleArsipItem} deleteNote={handleRemoveItem} title={note.title} date={note.createdAt} body={note.body} key={idx} idx={idx}/>
                :
                ""
              )
            })
            :
            "Tidak ada catatan"
          }
          {
            checkTidakAdaCatatan(false)
          }
        </section>
        
        <section className="notes_shelf">
          <h2>Arsip</h2>
          {
            notes ?
            notes.map((note, idx) => {
              return(
                note.archived && (note.title.toLocaleLowerCase()).includes(search.toLocaleLowerCase()) ? 
                <NotesCard isArsip={note.archived} arsipNote={handleArsipItem} deleteNote={handleRemoveItem} title={note.title} date={note.createdAt} body={note.body} key={idx} idx={idx}/>
                :
                ""
              )
            })
            :
            "Tidak ada catatan"
          }
          {
            checkTidakAdaCatatan(true)
          }
        </section>
    </main>
  );
}

export default App;
