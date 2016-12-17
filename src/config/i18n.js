const I18n = require('react-i18nify').I18n;


const i18n = {
  init() {
     I18n.setTranslations({
       gb: {
         common: {
           signup: "Signup",
           login: "Signin",
           save: 'Save',
           cancel: 'Cancel',
           edit: 'Edit',
           summary: 'Summary',
           details: 'Details',
           create: 'Create',
           about: "About",
           loading: "Loading"
         },
         menu: {
           home: 'Home',
           hacks: 'Hacks',
           rules: 'Rules',
           prizes: 'Prizes',
           judging: 'Judging',
           people: 'People',
           beautifier: 'Beautifier',
           beautify: 'Beautify',
           myhacks: 'My Hacks',
           profile: 'Profile',
           logout: 'Log out'
         },
         hackathon: {
           createHackathon: 'Create Hackathon',
           summary: 'Summary',
           details: 'Details',
           title: 'Title',
           date: "Date",
           organizer: "Organizer",
           shortDescription: 'Short Description',
           description: 'Description',
           startDate: 'Start Date',
           endDate: 'End Date',
           location: 'Location',
           rules: 'Rules',
           prizes: 'Prizes',
           descriptionPreview: 'Description Preview',
           rulesPreview: 'Rules Preview',
           prizesPreview: 'Prizes Preview',
           open: 'Open',
           active: 'Active'
         },
         hack: {
           validate: {
             title: "Enter a title",
             shortDescription: "Enter a short description",
             description: "Enter a description",
             location: "Enter a location"
           },
           title: "Title",
           description: "Description",
           shortDescription: "Short description",
           completed: "Completed",
           completedTooltip: "Check this box once the hack is completed",
           nominated: "Nominated",
           nominate: "Nominate",
           exportToCSV: "Export to CSV",
           join: "Join",
           leave: "Leave",
           location: "Location",
           organizer: "Organizer",
           team: "Team",
           science: "Science",
           scienceTooltip: "Check this box if this is science project",
           open: "Open",
           openTooltip: "Check this box if the hack is open to other participants",
           closed: "Closed",
           uncompleted: "Uncompleted",
           comments: "Comments",
           addComment: "Add Comment"
         },
         profile: {
           location: "Location",
           fullName: "Full name",
           website: "Website",
           description: "Description",
           password: "Password",
           confirmPassword: "Confirm Password",
           validation: {
             email: "Enter an email address",
             fullName: "Enter your full name",
             password: "Enter a password",
             confirmPassword: "Confirm your password"
           }
         },
         footer: {
           madeWith: "Made with",
           and: "and",
           backedBy: "backed by",
           foundABugReportAn: "Found a bug? Report an",
           issue: "issue"
         }
       },
       fr: {
         common: {
           signup: "S'inscrire",
           login: "S'identifier",
           save: "Enregistrer",
           cancel: "Annuller",
           edit: "Modifier",
           summary: "Résumé",
           details: "Détails",
           create: "Créer",
           about: "à propos",
           loading: "Chargement"
         },
         menu: {
           home: 'Acceuil',
           hacks: 'Hacks',
           rules: 'Règles',
           prizes: 'Prix',
           judging: 'Sélection',
           people: 'Participants',
           beautifier: 'Embellisseur',
           beautify: 'Embellir',
           myhacks: 'Mes Hacks',
           profile: 'Profil',
           logout: 'Déconnection'
         },
         hackathon: {
           createHackathon: 'Créer Hackathon',
           summary: 'Résumé',
           details: 'Détails',
           title: 'Titre',
           date: "Date",
           organizer: "Organisateur",
           shortDescription: 'Courte Description',
           description: 'Description',
           startDate: 'Début',
           endDate: 'Fin',
           location: 'Lieu',
           rules: 'Règles',
           prizes: 'Prix',
           descriptionPreview: 'aperçu Description',
           rulesPreview: 'Aperçu Règles',
           prizesPreview: 'Aperçu Prix',
           open: 'Ouvert',
           active: 'Actif'
         },
         hack: {
           validate: {
             title: "Entrez un titre",
             shortDescription: "Entrez une courte description",
             description: "Entrez une description",
             location: "Entrez un lieu"
           },
           title: "Titre",
           description: "Description",
           descriptionPreview: "Aperçu description",
           shortDescription: "Courte description",
           completed: "Finit",
           completedTooltip: "Cochez cette case une fois le hack terminé",
           nominated: "Nominé",
           nominate: "Nominer",
           exportToCSV: "Exportez en CSV",
           join: "Joindre",
           leave: "Quitter",
           location: "Lieu",
           organizer: "Organisateur",
           team: "Equipe",
           science: "Science",
           scienceTooltip: "Cochez cette case s'il s'agit d'un projet scientifique",
           open: "Ouvert",
           openTooltip: "Cochez cette case si le hack est ouvert aux autres participants",
           closed: "Fermé",
           uncompleted: "Inachevé",
           comments: "Commentaires",
           addComment: "Ajouter Commentaire"
         },
         profile: {
           location: "Lieu",
           fullName: "Nom complet",
           website: "Site web",
           description: "Description",
           password: "Mot de passe",
           confirmPassword: "Confirmez le mot de passe",
           validation: {
             email: "Entrez une adresse email",
             fullName: "Entrez votre nom",
             password: "Entrez votre mot de passe",
             confirmPassword: "Confirmez votre mote de passe"
           }
         },
         footer: {
           madeWith: "Développé avec",
           and: "et",
           backedBy: "Soutenu par",
           foundABugReportAn: "Vous avez trouvé un bug? Signalez un",
           issue: "problem"
         }
       }
     });
     I18n.setLocale('gb');
   },
    switchLocale(lang) {
      I18n.setLocale(lang);
    }
}

export default i18n;
