import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public quillModules = {
      toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': [] }],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['clean']                                         // remove formatting button
      ]
  };

  datasets = [
    {
      language: "DE",
      originalName: "SoftconCIS",
      translatedName: "SoftconCIS",
      videoUrl: "",
      originalDescription: "Softconcis ist die Software für strategischen Einkauf",
      translatedDescription: "Softconcis: Softconcis ist die Software für strategischen Einkauf"
    },
    {
      language: "EN",
      originalName: "SoftconCIS",
      translatedName: "The SoftconCIS Company",
      videoUrl: "",
      originalDescription: "Softconcis ist die Software für strategischen Einkauf",
      translatedDescription: "Softconcis ist die Software für strategischen Einkauf"
    },
    {
      language: "FR",
      originalName: "SoftconCIS",
      translatedName: "SôftconCIS",
      videoUrl: "",
      originalDescription: "Softconcis ist die Software für strategischen Einkauf",
      translatedDescription: "Softconcis ist die Software für strategischen Einkauf"
    },
  ];

  /*orignal Variables */
  selectedLanguage = "";
  selectedSet = this.datasets[0];
  originalName;
  originalDescription = this.datasets[0].originalDescription;

  translatedName = this.datasets[0].translatedName;
  changedName;
  translatedDescription = this.datasets[0].translatedDescription;


ngOnInit() {
  if(this.translatedDescription != this.originalDescription) {
    document.getElementById('button-undoDescription').classList.add('btn-active');
    (<HTMLButtonElement>document.getElementById('button-undoDescription')).disabled =false;
  }
}


  /**change selected Entry **/
  selected(value: any) {
    this.selectedLanguage = value.substring(0, 2);
    for (let set of this.datasets) {
      if (this.selectedLanguage == set.language) {
        this.selectedSet = set;
        this.originalName = set.originalName;
        this.translatedName = set.translatedName;
        this.originalDescription = set.originalDescription;
        this.translatedDescription = set.translatedDescription;
      }
    }
    var el = document.getElementById('schowOriginalName');
    el.innerHTML = this.selectedSet.originalName;

    var el = document.getElementById('schowTranslatedName');
    el.innerHTML = this.selectedSet.translatedName;

    if(this.translatedDescription != this.originalDescription) {
      document.getElementById('button-undoDescription').classList.add('btn-active');
      (<HTMLButtonElement>document.getElementById('button-undoDescription')).disabled =false;
    } else {
      document.getElementById('button-undoDescription').classList.remove('btn-active');
      (<HTMLButtonElement>document.getElementById('button-undoDescription')).disabled = true;
    }
  }

  newName() {
    this.changedName = (<HTMLInputElement>document.getElementById('inputNewName')).value;
    if (this.changedName.length >= 2 && this.changedName != this.translatedName) {
      this.enableSave(true);
      console.log(this.changedName);
    } else {
      this.enableSave(false);
    }
  }

  submitDescription() {
    this.enableSave(true);
  }

  /*When a change is detected, the save-btn is enabled or disabled*/
  enableSave(value: boolean) {
    if (value) {
      document.getElementById('globalSaveButton').classList.add('btn-active');
      (<HTMLButtonElement>document.getElementById('globalSaveButton')).disabled = false;

    } else {
      document.getElementById('globalSaveButton').classList.remove('btn-active');
      (<HTMLButtonElement>document.getElementById('globalSaveButton')).disabled = true;
    }
  }

  openEditor() {
    document.getElementById('containerQuill').classList.remove('hide');
    document.getElementById('textareaDescription').classList.add('hide');
    document.getElementById('changeDescription').classList.add('hide');
    document.getElementById('cancelDescription').classList.remove('hide');
    this.enableSave(true);
  }

cancelDescription() {
  this.translatedDescription = this.selectedSet.translatedDescription;
  document.getElementById('containerQuill').classList.add('hide');
  document.getElementById('textareaDescription').classList.remove('hide')
  document.getElementById('changeDescription').classList.remove('hide');
  document.getElementById('cancelDescription').classList.add('hide');
  this.enableSave(false);
}

  saveLocalChanges() {
    let nameChanged = false;
    let descriptionChanged = false;
    if (this.changedName != null && this.changedName.length >= 2 && this.changedName != this.translatedName) {
      this.selectedSet.translatedName = this.changedName;
      nameChanged = true;
    }

    if (this.translatedDescription != null && this.translatedDescription != this.selectedSet.translatedDescription) {
      this.selectedSet.translatedDescription =this.translatedDescription;
      descriptionChanged=true;

      document.getElementById('textareaDescription').classList.remove('hide');
      document.getElementById('containerQuill').classList.add('hide');
      document.getElementById('cancelDescription').classList.remove('btn-active');
      (<HTMLButtonElement>document.getElementById('cancelDescription')).disabled = true;
    }


    this.changedName = null;
    (<HTMLInputElement>document.getElementById('inputNewName')).value = "";
    document.getElementById('globalSaveButton').classList.remove('btn-active');
    (<HTMLButtonElement>document.getElementById('globalSaveButton')).disabled = true;

    this.feedbackMessage(nameChanged, descriptionChanged, false, false);
  }

  resetDescription(){
    this.hideFeedback();
    document.getElementById('feedback').classList.remove('hide');
    document.getElementById('undoConfirmation').classList.remove('hide');
    document.getElementById('changeDescription').classList.remove('btn-active');
    document.getElementById('button-undoDescription').classList.remove('btn-active');
    (<HTMLButtonElement>document.getElementById('changeDescription')).disabled =true;
    (<HTMLButtonElement>document.getElementById('button-undoDescription')).disabled =true;
  }

  hideFeedback() {
    document.getElementById('descriptionUndoSuccess').classList.add('hide');
    document.getElementById('nameSuccess').classList.add('hide');
    document.getElementById('nameError').classList.add('hide');
    document.getElementById('nameDescriptionSuccess').classList.add('hide');
    document.getElementById('nameDescriptionError').classList.add('hide');
    document.getElementById('descriptionError').classList.add('hide');
    document.getElementById('descriptionSuccess').classList.add('hide');
    document.getElementById('feedbackUndoIcon').classList.add('hide');
    document.getElementById('feedbackSuccessIcon').classList.add('hide');
    document.getElementById('feedbackErrorIcon').classList.add('hide');
    document.getElementById('undoError').classList.add('hide');
    document.getElementById('unknownError').classList.add('hide');
    document.getElementById('undoConfirmation').classList.add('hide');

  }

  feedbackMessage(name: boolean, description: boolean, error: boolean, undo: boolean) {
    this.hideFeedback();
    if (name && description && !error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackSuccessIcon').classList.remove('hide');
      document.getElementById('nameDescriptionSuccess').classList.remove('hide');
    } else if (name && !error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackSuccessIcon').classList.remove('hide');
      document.getElementById('nameSuccess').classList.remove('hide');
    } else if (description && !error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackSuccessIcon').classList.remove('hide');
      document.getElementById('descriptionSuccess').classList.remove('hide');
    } else if (undo && !error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackUndoIcon').classList.remove('hide');
      document.getElementById('descriptionUndoSuccess').classList.remove('hide');
    } else if (name && description && error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackErrorIcon').classList.remove('hide');
      document.getElementById('nameDescriptionError').classList.remove('hide');
    } else if (name && error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackErrorIcon').classList.remove('hide');
      document.getElementById('nameError').classList.remove('hide');
    } else if (description && error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackErrorIcon').classList.remove('hide');
      document.getElementById('descriptionError').classList.remove('hide');
    } else if (undo && error) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackErrorIcon').classList.remove('hide');
      document.getElementById('undoError').classList.remove('hide');
    } else if (!undo && error && !description && !name) {
      document.getElementById('feedback').classList.remove('hide');
      document.getElementById('feedbackErrorIcon').classList.remove('hide');
      document.getElementById('unknownError').classList.remove('hide');
    }
  }

  changeQuill(){
    console.log("quiill");
  }
}
