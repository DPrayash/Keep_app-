import { Component, OnInit} from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  notes: Note[] = [];  
  newNote: Note = { id: 0, title: '', content: '' }; 
  isNotesExpanded: boolean = false;
  errMessage: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit() { 
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      (notes) => {
        this.notes = notes;
      },
      (error) => {
        console.log('Error fetching notes:', error);
        this.errMessage = 'Error fetching notes. Please try again later.';
      }
    );
  }

  addNote() {
    if (!this.newNote.title || !this.newNote.content) {
      this.errMessage = 'Both Title and Text fields are required.'; // Set the errMessage for UI validation error
      return; // Return early if any field is empty
    }
    this.errMessage = '';
    this.notesService.addNote(this.newNote).subscribe(
      (note) => {
        this.notes.push(note);
        this.newNote = { id: 0, title: '', content: '' };
        this.errMessage ='Note added successfully!';
      },
      (error) => {
        this.errMessage = 'Error adding note!';
      }
    );
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note.id).subscribe(
      () => {
        this.notes = this.notes.filter((n) => n.id !== note.id);
        this.errMessage ='Note deleted successfully!';
      },
      (error) => {
        this.errMessage ='Error deleting note!';
      }
    );
  }

}
