import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}
 


  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }



  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }


  
  deleteNote(id: number): Observable<void> { 
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
