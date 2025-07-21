/**
 * 
 * All the static texts used by KissJS library
 * 
 * - English is the reference language
 * - keys prefixed with a # indicate they are a text code, therefore, they need a translation in every language
 * - keys with no English translation means the key is the English text (no need to translate it)
 * - in case a text is not translated in a specific language, the English text will be used as fallback, but it's not normal.
 * 
 * Current supported languages:
 * - English (en)
 * - French (fr)
 * - Spanish (es)
 */
kiss.language.texts = {
    /**
     * General
     */
    "_": {
        en: "en",
        fr: "fr",
        es: "es"
    },
    "data": {
        fr: "données",
        es: "datos"
    },
    "untitled": {
        fr: "sans titre",
        es: "sin título"
    },
    "yes": {
        fr: "oui",
        es: "sí"
    },
    "no": {
        fr: "non",
        es: "no"
    },
    "or": {
        fr: "ou",
        es: "o"
    },
    "and": {
        fr: "et",
        es: "y"
    },
    "other": {
        fr: "autre",
        es: "otro"
    },
    "new": {
        fr: "nouveau",
        es: "nuevo"
    },
    "edit": {
        fr: "modifier",
        es: "editar"
    },
    "validate": {
        fr: "valider",
        es: "validar"
    },
    "cancel": {
        fr: "annuler",
        es: "cancelar"
    },
    "delete": {
        fr: "supprimer",
        es: "eliminar"
    },
    "update": {
        fr: "mettre à jour",
        es: "actualizar"
    },
    "back": {
        fr: "retour",
        es: "regresar"
    },
    "save": {
        fr: "sauver",
        es: "guardar"
    },
    "save changes": {
        fr: "sauver les modifications",
        es: "guardar cambios"
    },
    "exit": {
        fr: "sortir",
        es: "salir"
    },
    "save and exit": {
        fr: "sauver et sortir",
        es: "guardar y salir"
    },
    "refresh": {
        fr: "mettre à jour",
        es: "actualizar"
    },
    "#not authorized": {
        en: "you are not authorized to perform this operation",
        fr: "vous n'êtes pas autorisé à effectuer cette opération",
        es: "no estás autorizado para realizar esta operación"
    },
    "#error general": {
        en: "sorry, we could not perform this operation",
        fr: "désolé, nous n'avons pas pu effectuer cette opération",
        es: "lo sentimos, no pudimos realizar esta operación"
    },
    "color": {
        fr: "couleur",
        es: "color"
    },
    "geometry": {
        fr: "géométrie",
        es: "geometría"
    },
    "width": {
        fr: "largeur",
        es: "ancho"
    },
    "height": {
        fr: "hauteur",
        es: "altura"
    },
    "contains": {
        fr: "contient",
        es: "contiene"
    },
    "does not contain": {
        fr: "ne contient pas",
        es: "no contiene"
    },
    "is empty": {
        fr: "est vide",
        es: "está vacío"
    },
    "is not empty": {
        fr: "n'est pas vide",
        es: "no está vacío"
    },
    "Unable to download this file.": {
        fr: "Impossible de télécharger ce fichier.",
        es: "No es posible descargar este archivo."
    },
    "search": {
        fr: "rechercher",
        es: "buscar"
    },
    "#createdAt": {
        en: "created at",
        fr: "créé le",
        es: "creado el"
    },
    "#createdBy": {
        en: "created by",
        fr: "créé par",
        es: "creado por"
    },
    "#updatedAt": {
        en: "updated at",
        fr: "modifié le",
        es: "modificado el"
    },
    "#updatedBy": {
        en: "updated by",
        fr: "modifié par",
        es: "modificado por"
    },
    "#deletedAt": {
        en: "deleted at",
        fr: "supprimé le",
        es: "eliminado el"
    },
    "#deletedBy": {
        en: "deleted by",
        fr: "supprimé par",
        es: "eliminado por"
    },
    "copy to clipboard": {
        fr: "copier dans le presse-papier",
        es: "copiar al portapapeles"
    },
    "copied to clipboard": {
        fr: "copié dans le presse-papier",
        es: "copiado al portapapeles"
    },
    "#update done": {
        en: "update done",
        fr: "mise à jour effectuée",
        es: "actualización realizada"
    },
    "nothing to undo": {
        fr: "rien à annuler",
        es: "nada que deshacer"
    },
    "nothing to redo": {
        fr: "rien à refaire",
        es: "nada que rehacer"
    },
    "undo": {
        en: "undo last change",
        fr: "annuler la dernière modification",
        es: "deshacer la última modificación"
    },
    "redo": {
        en: "redo last change",
        fr: "refaire la dernière modification",
        es: "rehacer la última modificación"
    },

    /**
     * Authentication & Registration
     */
    "name": {
        fr: "nom",
        es: "nombre"
    },
    "first name": {
        fr: "prénom",
        es: "nombre"
    },
    "last name": {
        fr: "nom",
        es: "apellido"
    },
    "email": {
        fr: "email",
        es: "correo electrónico"
    },
    "password": {
        fr: "mot de passe",
        es: "contraseña"
    },
    "login": {
        fr: "se connecter",
        es: "iniciar sesión"
    },
    "login with": {
        fr: "se connecter avec",
        es: "iniciar sesión con"
    },
    "#no account": {
        en: "don't have an account? Sign up",
        fr: "pas de compte ? Enregistrez-vous",
        es: "¿No tienes cuenta? Regístrate"
    },
    "#already an account": {
        en: "already have an account? Sign in",
        fr: "vous avez un compte ? Connectez-vous",
        es: "¿Ya tienes cuenta? Inicia sesión"
    },
    "#authentication error": {
        en: "sorry, we could not authenticate you properly with third party service...",
        fr: "désolé, nous n'avons pas pu vous authentifier correctement auprès du service externe",
        es: "lo sentimos, no pudimos autenticarte correctamente con el servicio externo..."
    },
    "register": {
        fr: "s'enregistrer",
        es: "registrarse"
    },
    "register with": {
        fr: "s'enregistrer avec",
        es: "registrarse con"
    },
    "register to": {
        fr: "s'enregistrer à",
        es: "registrarse en"
    },
    "#thanks for registration": {
        en: "thank you! You will soon receive an email containing a link to activate your account...",
        fr: "merci ! Vous allez bientôt recevoir un email contenant un lien pour activer votre compte...",
        es: "¡Gracias! Pronto recibirás un correo electrónico con un enlace para activar tu cuenta..."
    },

    /**
     * Password change
     */
    "forgot password?": {
        fr: "mot de passe oublié ?",
        es: "¿Olvidaste tu contraseña?"
    },
    "change password": {
        fr: "changer le mot de passe",
        es: "cambiar la contraseña"
    },
    "password confirmation": {
        fr: "confirmation du mot de passe",
        es: "confirmación de contraseña"
    },
    "new password": {
        fr: "nouveau mot de passe",
        es: "nueva contraseña"
    },
    "new password confirmation": {
        fr: "confirmation du nouveau mot de passe",
        es: "confirmación de la nueva contraseña"
    },
    "#password don't match": {
        en: "Your 2 passwords don't match",
        fr: "Vos 2 mots de passe ne correspondent pas",
        es: "Tus 2 contraseñas no coinciden"
    },
    "please, enter your email": {
        fr: "entrez votre email SVP",
        es: "por favor, ingresa tu correo electrónico"
    },
    "#email missing": {
        en: "please, enter your email",
        fr: "merci de préciser votre email",
        es: "por favor, ingresa tu correo electrónico"
    },
    "password reset": {
        fr: "réinitialisation du mot de passe",
        es: "restablecimiento de contraseña"
    },
    "#password reset request": {
        en: "We've just sent you an email to reset your password.\nDon't forget to check your spam folder!",
        fr: "Nous venons de vous envoyer un email pour réinitialiser votre mot de passe.\nN'oubliez pas de vérifier votre dossier spam !",
        es: "Acabamos de enviarte un correo electrónico para restablecer tu contraseña.\n¡No olvides revisar tu carpeta de spam!"
    },

    /**
     * Directory
     */
    "user": {
        fr: "utilisateur",
        es: "usuario"
    },
    "users": {
        fr: "utilisateurs",
        es: "usuarios"
    },
    "collaborations": {
        fr: "collaborations",
        es: "colaboraciones"
    },
    "accounts": {
        fr: "comptes",
        es: "cuentas"
    },
    "groups": {
        fr: "groupes",
        es: "grupos"
    },

    /**
     * Network
     */
    "#websocket disconnected": {
        en: "sorry, it seems you've been disconnected. Trying to reconnect...",
        fr: "désolé, il semble que vous ayez été déconnecté. Essai de reconnexion...",
        es: "lo siento, parece que has sido desconectado. Intentando reconectar..."
    },
    "#websocket connection lost": {
        en: "sorry, the connection has been lost. Try to reload the page...\n\nIt is also possible that your profile is connected to another tab or browser.\nIt's not possible to be logged in twice with the same profile.",
        fr: "désolé, la connexion a été perdue. Essayez de recharger la page...\n\nIl est possible aussi que votre profil se soit connecté sur un autre onglet ou navigateur.\nIl n'est pas possible d'être connecté deux fois avec le même profil.",
        es: "lo siento, la conexión se ha perdido. Intenta recargar la página...\n\nTambién es posible que tu perfil esté conectado en otra pestaña o navegador.\nNo es posible iniciar sesión dos veces con el mismo perfil."
    },
    "#error slow connection": {
        en: "sorry, your connection is too slow to load data properly",
        fr: "désolé, votre connexion est trop lente pour charger les données correctement",
        es: "lo sentimos, tu conexión es demasiado lenta para cargar los datos correctamente"
    },

    /**
     * Features
     */
    "#coming soon": {
        en: "coming soon",
        fr: "bientôt disponible",
        es: "próximamente"
    },
    "#not available yet": {
        en: "this feature is not available yet but we're working on it!",
        fr: "cette fonctionnalité n'est pas encore disponible mais nous travaillons dessus !",
        es: "esta función aún no está disponible, ¡pero estamos trabajando en ello!"
    },

    /**
     * Main menu
     */
    "select a theme": {
        fr: "choisir un thème",
        es: "seleccionar un tema"
    },
    "open the map": {
        fr: "ouvrir la carte",
        es: "abrir el mapa"
    },
    "logout": {
        fr: "se déconnecter",
        es: "cerrar sesión"
    },
    "#auto logout": {
        en: "auto logout",
        fr: "déconnexion automatique",
        es: "cerrar sesión automáticamente",
    },
    "#auto logout help": {
        en: "determine the idle time (in hours) before auto logout",
        fr: "déterminez le temps d'inactivité (en heures) avant la déconnexion automatique",
        es: "determina el tiempo de inactividad (en horas) antes de cerrar sesión automáticamente"
    },

    /**
     * Languages
     */
    "translation": {
        fr: "traduction",
        es: "traducción"
    },
    "target language": {
        fr: "langue cible",
        es: "idioma de destino"
    },
    "reference language": {
        fr: "langue de référence",
        es: "idioma de referencia"
    },
    "existing translations": {
        fr: "traductions existantes",
        es: "traducciones existentes"
    },
    "left column": {
        fr: "colonne de gauche",
        es: "columna izquierda"
    },
    "right column": {
        fr: "colonne de droite",
        es: "columna derecha"
    },
    "#switch language": {
        en: "language",
        fr: "langue",
        es: "idioma"
    },
    "interface language": {
        fr: "langue de l'interface",
        es: "idioma de la interfaz"
    },
    "prefered language for content": {
        fr: "langue préférée pour le contenu",
        es: "idioma preferido para el contenido"
    },
    "#content language help": {
        en: `If an application is translated in your prefered language, the content will be displayed in this language.`,
        fr: `Si une application est traduite dans votre langue préférée, le contenu sera affiché dans cette langue.`,
        es: `Si una aplicación está traducida a tu idioma preferido, el contenido se mostrará en ese idioma.`
    },
    "pick a language": {
        fr: "choisissez une langue",
        es: "elige un idioma"
    },

    /**
     * Fields
     */
    "text": {
        fr: "texte",
        es: "texto"
    },
    "paragraph": {
        fr: "paragraphe",
        es: "párrafo"
    },
    "rich text": {
        fr: "texte riche",
        es: "texto enriquecido"
    },
    "#rtf static toolbar": {
        en: "static toolbar",
        fr: "barre d'outils statique",
        es: "barra de herramientas estática"
    },
    "#rtf floating toolbar": {
        en: "floating toolbar",
        fr: "barre d'outils flottante",
        es: "barra de herramientas flotante"
    },
    "static text": {
        fr: "texte statique",
        es: "texto estático"
    },    
    "number": {
        fr: "nombre",
        es: "número"
    },
    "date": {
        fr: "date",
        es: "fecha"
    },
    "time": {
        fr: "heure",
        es: "hora"
    },
    "button": {
        fr: "bouton",
        es: "botón"
    },
    "array": {
        fr: "tableau",
        es: "arreglo"
    },
    "test": {
        fr: "test",
        es: "prueba"
    },
    "#select": {
        en: "dropdown list (static)",
        fr: "liste déroulante (statique)",
        es: "lista desplegable (estática)"
    },
    "#select view column": {
        en: "dropdown list (1 view column)",
        fr: "liste déroulante (1 colonne de vue)",
        es: "lista desplegable (1 columna de vista)"
    },
    "#select view columns": {
        en: "select from a view",
        fr: "sélection dans une vue",
        es: "selección desde una vista"
    },
    "#select view": {
        en: "select the data source view",
        fr: "sélectionnez la vue source des données",
        es: "selecciona la vista de la fuente de datos"
    },
    "checkbox": {
        fr: "case à cocher",
        es: "casilla de verificación"
    },
    "slider": {
        en: "progress bar",
        fr: "barre de progression",
        es: "barra de progreso"
    },
    "slider step": {
        en: "step",
        fr: "incrément",
        es: "incremento"
    },
    "rating": {
        fr: "notation",
        es: "calificación"
    },
    "attachment": {
        fr: "fichiers attachés",
        es: "archivos adjuntos"
    },
    "attachments": {
        fr: "fichiers attachés",
        es: "archivos adjuntos"
    },
    "collaborators": {
        fr: "collaborateurs",
        es: "colaboradores"
    },
    "color picker": {
        fr: "palette de couleur",
        es: "selector de color"
    },
    "icon picker": {
        fr: "palette d'icônes",
        es: "selector de iconos"
    },
    "map field": {
        en: "map",
        fr: "carte",
        es: "mapa"
    },
    "map ratio": {
        en: "map ratio (width/height)",
        fr: "ratio de la carte (largeur/hauteur)",
        es: "relación del mapa (ancho/alto)"
    },
    "map zoom": {
        fr: "zoom de la carte",
        es: "zoom del mapa"
    },
    "from": {
        fr: "de",
        es: "de"
    },
    "to": {
        fr: "à",
        es: "a"
    },
    "cc": {
        fr: "copie à",
        es: "cc"
    },
    "subject": {
        fr: "sujet",
        es: "asunto"
    },
    "#updating ACL": {
        en: "the security of this file changed to",
        fr: "la sécurité de ce fichier a changé en",
        es: "la seguridad de este archivo cambió a"
    },
    "#update file ACL": {
        en: "put this file %access in",
        fr: "mettre ce fichier en accès %access",
        es: "poner este archivo %access en"
    },
    "public": {
        fr: "public",
        es: "público"
    },
    "private": {
        fr: "privé",
        es: "privado"
    },
    "field style": {
        fr: "style du champ",
        es: "estilo del campo"
    },
    "#style no labels": {
        en: "without field labels",
        fr: "sans les libellés de champs",
        es: "sin etiquetas de campos"
    },
    "#style compact": {
        en: "compact",
        fr: "compact",
        es: "compacto"
    },
    "#fields incorrect value": {
        en: "some fields have an incorrect value",
        fr: "certains champs ont une valeur incorrecte",
        es: "algunos campos tienen un valor incorrecto"
    },
    "#not available offline": {
        en: "sorry, this feature is not available offline",
        fr: "désolé, cette fonctionnalité n'est pas disponible hors ligne",
        es: "lo siento, esta función no está disponible sin conexión"
    },
    "#not available in demo": {
        en: "sorry, this feature is not available in the demonstration",
        fr: "désolé, cette fonctionnalité n'est pas disponible dans la démonstration",
        es: "lo siento, esta función no está disponible en la demostración"
    },

    /**
     * Rich text editor
     */
    "images": {
        fr: "images",
        es: "imágenes"
    },
    "#image from url": {
        en: "integrate an image from a URL",
        fr: "intégrer une image depuis une URL",
        es: "integrar una imagen desde una URL"
    },
    "#image from library": {
        en: "choose an image from the library",
        fr: "choisir une image depuis la bibliothèque",
        es: "elegir una imagen desde la biblioteca"
    },
    "#image from download": {
        en: "download a new image",
        fr: "télécharger une nouvelle image",
        es: "descargar una nueva imagen"
    },
    "#image from unsplash": {
        en: "add an image from Unsplash",
        fr: "ajouter une image depuis Unsplash",
        es: "añadir imagen desde Unsplash"
    },
    "#file attachment": {
        en: "attach a file",
        fr: "attacher un fichier",
        es: "adjuntar un archivo"
    },
    "#integrate button": {
        en: "integrate a button",
        fr: "intégrer un bouton",
        es: "integrar un botón"
    },
    "image properties": {
        fr: "propriétés de l'image",
        es: "propiedades de la imagen"
    },
    "image URL": {
        fr: "URL de l'image",
        es: "URL de la imagen"
    },
    "alternative text": {
        fr: "texte alternatif",
        es: "texto alternativo"
    },
    "caption": {
        fr: "légende",
        es: "subtítulo"
    },

    /**
     * Speech recognition
     */
    "#recognition not available": {
        en: "speech recognition is not available on this browser",
        fr: "la reconnaissance vocale n'est pas disponible sur ce navigateur",
        es: "el reconocimiento de voz no está disponible en este navegador"
    },
    "#recognition speak": {
        en: "speak now!",
        fr: "parlez maintenant !",
        es: "¡habla ahora!",
    },
    "#recognition error": {
        en: "an error occurred during speech recognition",
        fr: "une erreur s'est produite lors de la reconnaissance vocale",
        es: "se produjo un error durante el reconocimiento de voz"
    },

    /**
     * AI image
     */
    "AI image": {
        fr: "image IA",
        es: "imagen IA"
    },
    "#image generator": {
        en: "your AI image generator assistant",
        fr: "votre assistant IA pour générer des images",
        es: "tu asistente generador de imágenes IA"
    },
    "image format": {
        fr: "format de l'image",
        es: "formato de la imagen"
    },
    "#AI image instructions": {
        en: "give your instructions to the AI image generator",
        fr: "donnez vos instructions à l'IA pour générer l'image",
        es: "da tus instrucciones al generador de imágenes IA"
    },
    "generate image...": {
        fr: "générer l'image...",
        es: "generar imagen..."
    },
    "generate an image": {
        fr: "générer une image",
        es: "generar una imagen"
    },
    "portrait": {
        fr: "portrait",
        es: "retrato"
    },
    "landscape": {
        fr: "paysage",
        es: "paisaje"
    },
    "square": {
        fr: "carré",
        es: "cuadrado"
    },

    /**
     * AI paragraph
     */
    "AI paragraph": {
        fr: "paragraphe IA",
        es: "párrafo de IA"
    },
    "your AI assistant": {
        fr: "votre assistant IA",
        es: "tu asistente de IA"
    },
    "response max length": {
        fr: "longueur maximale de la réponse",
        es: "longitud máxima de la respuesta"
    },
    "#AI prompt instructions": {
        en: "give your instructions to the AI",
        fr: "donnez vos instructions à l'IA",
        es: "da tus instrucciones a la IA"
    },
    "generate content...": {
        fr: "générer le contenu...",
        es: "generar contenido..."
    },
    "are you sure you want to cancel your input?": {
        fr: "êtes-vous sûr de vouloir annuler votre saisie ?",
        es: "¿Estás seguro de querer cancelar tu entrada?"
    },
    "creativity": {
        fr: "créativité",
        es: "creatividad"
    },

    // AI profiles
    "AI profile": {
        fr: "profil de l'IA",
        es: "perfil de la IA"
    },
    "no profile": {
        fr: "pas de profil",
        es: "sin perfil"
    },
    "sales rep": {
        fr: "commercial",
        es: "comercial"
    },
    "HR manager": {
        fr: "manager RH",
        es: "gerente de RRHH"
    },
    "marketing manager": {
        fr: "manager marketing",
        es: "gerente de marketing"
    },
    "product manager": {
        fr: "responsable produit",
        es: "gerente de producto"
    },
    // Tasks
    "task": {
        fr: "tâche",
        es: "tarea"
    },
    "free": {
        fr: "libre",
        es: "libre"
    },
    "draft a blog post": {
        fr: "écrire un brouillon de post de blog",
        es: "escribir un borrador de entrada de blog"
    },
    "summup a text": {
        fr: "résumer un texte",
        es: "resumir un texto"
    },
    "convert to Tweet": {
        fr: "convertir en Tweet",
        es: "convertir a Tweet"
    },
    "write an email": {
        fr: "écrire un email",
        es: "escribir un correo electrónico"
    },
    "create user persona": {
        fr: "créer un persona",
        es: "crear un persona"
    },
    "create job description": {
        fr: "créer une description d'emploi",
        es: "crear una descripción de empleo"
    },
    // Tones
    "tone to use": {
        fr: "ton à utiliser",
        es: "tono a usar"
    },
    "casual": {
        fr: "décontracté",
        es: "informal"
    },
    "formal": {
        fr: "formel",
        es: "formal"
    },
    "humour": {
        fr: "humour",
        es: "humor"
    },
    "ironic": {
        fr: "ironique",
        es: "irónico"
    },
    // Goals
    "goal": {
        fr: "objectif",
        es: "objetivo"
    },
    "none": {
        fr: "aucun",
        es: "ninguno"
    },
    "inform": {
        fr: "informer",
        es: "informar"
    },
    "persuade": {
        fr: "persuader",
        es: "persuadir"
    },
    "inspire": {
        fr: "inspirer",
        es: "inspirar"
    },

    /**
     * Views
     */
    "#pick a view type": {
        en: "pick a view type to display your data",
        fr: "choisissez un type de vue pour afficher vos données",
        es: "elige un tipo de vista para mostrar tus datos"
    },
    "datatable": {
        fr: "grille de données",
        es: "tabla de datos"
    },
    "#datatable view": {
        en: "create a grid view to manage your data as easily as in a spreadsheet",
        fr: "créez une vue table pour gérer vos données aussi facilement que dans un tableur",
        es: "crea una vista de cuadrícula para gestionar tus datos tan fácilmente como en una hoja de cálculo"
    },
    "calendar": {
        fr: "calendrier",
        es: "calendario"
    },
    "#calendar view": {
        en: "visualize your data in a calendar according to the date fields of your forms",
        fr: "visualisez vos données dans un agenda en fonction des champs date de vos formulaires",
        es: "visualiza tus datos en un calendario según los campos de fecha de tus formularios"
    },
    "gallery": {
        fr: "gallerie",
        es: "galería"
    },
    "map": {
        fr: "carte",
        es: "mapa"
    },
    "#gallery view": {
        en: "display your data by highlighting attached images in your forms",
        fr: "affichez vos données en mettant en évidence les images jointes à vos formulaires",
        es: "muestra tus datos destacando las imágenes adjuntas en tus formularios"
    },
    "#kanban view": {
        en: "follow your tasks or activity pipelines on a kanban board",
        fr: "suivez vos tâches ou pipelines d'activités sur un tableau kanban",
        es: "sigue tus tareas o tuberías de actividad en un tablero kanban"
    },
    "timeline": {
        fr: "ligne de temps",
        es: "línea de tiempo"
    },
    "#timeline view": {
        en: "follow your tasks or activity pipelines on a timeline",
        fr: "suivez vos tâches ou pipelines d'activités sur une ligne de temps",
        es: "sigue tus tareas o tuberías de actividad en una línea de tiempo"
    },
    "#map view": {
        en: "visualize your data on a map according to the location fields of your forms",
        fr: "visualisez vos données sur une carte en fonction des champs géolocalisation de vos formulaires",
        es: "visualiza tus datos en un mapa según los campos de ubicación de tus formularios"
    },
    "chart": {
        fr: "graphique",
        es: "gráfico"
    },
    "#chart view": {
        en: "visualize your data in a chart",
        fr: "visualisez les données dans un graphique",
        es: "visualiza los datos en un gráfico"
    },

    /**
     * Dashboard
     */
    "dashboard": {
        fr: "tableau de bord",
        es: "tablero de control"
    },
    "#dashboard view": {
        en: "create a dashboard with multiple charts to follow your key indicators",
        fr: "créez un tableau de bord de plusieurs graphiques pour suivre vos indicateurs clés",
        es: "crea un tablero de control con varios gráficos para seguir tus indicadores clave"
    },
    "#help setup chart": {
        en: "click here to setup this chart",
        fr: "cliquez ici pour paramétrer ce graphique",
        es: "haz clic aquí para configurar este gráfico"
    },    
    "#help add chart": {
        en: "click here to add another chart on this row",
        fr: "cliquez ici pour ajouter un autre graphique sur cette ligne",
        es: "haz clic aquí para añadir otro gráfico a este tablero"
    },
    "add chart": {
        fr: "ajouter un graphique",
        es: "añadir un gráfico"
    },
    "this row is full": {
        fr: "cette ligne est pleine",
        es: "esta fila está llena"
    },
    "move up": {
        fr: "déplacer vers le haut",
        es: "mover hacia arriba"
    },
    "move down": {
        fr: "déplacer vers le bas",
        es: "mover hacia abajo"
    },
    "row height": {
        fr: "hauteur de la ligne",
        es: "altura de la fila"
    },
    "add row": {
        fr: "ajouter une ligne",
        es: "añadir una fila"
    },
    "delete this row": {
        fr: "supprimer cette ligne",
        es: "eliminar esta fila"
    },
    "#delete row": {
        en: "are you sure you want to delete this row?",
        fr: "êtes-vous sûr de vouloir supprimer cette ligne ?",
        es: "¿estás seguro de querer eliminar esta fila?"
    },

    /**
     * Attachment field
     */
    "attach files": {
        fr: "attacher des fichiers",
        es: "adjuntar archivos"
    },
    "select files to upload": {
        fr: "sélectionner les fichiers à télécharger",
        es: "seleccionar archivos para subir"
    },
    "choose your upload method": {
        fr: "choisissez votre méthode de téléchargement",
        es: "elige tu método de carga"
    },
    "my device": {
        fr: "mon ordinateur",
        es: "mi dispositivo"
    },
    "#upload local help": {
        en: "drag and drop some files here, or click on the button below to browse your disk...",
        fr: "glissez déposez des fichiers ici, ou cliquez sur le bouton ci-dessous pour rechercher sur votre disque",
        es: "arrastra y suelta algunos archivos aquí, o haz clic en el botón de abajo para explorar tu disco..."
    },
    "#upload local help mobile": {
        en: "click on the button below to browse your device...",
        fr: "cliquez sur le bouton ci-dessous pour rechercher sur votre appareil...",
        es: "haz clic en el botón de abajo para explorar tu dispositivo..."
    },
    "#upload security mode": {
        en: "public / private",
        fr: "public / privé",
        es: "público / privado"
    },
    "link (URL)": {
        fr: "hyperlien (URL)",
        es: "enlace (URL)"
    },
    "add file from URL": {
        fr: "ajouter le fichier depuis l'URL",
        es: "añadir archivo desde URL"
    },
    "enter an URL here": {
        fr: "entez une URL ici",
        es: "ingresa una URL aquí"
    },
    "#upload link help": {
        en: "copy/paste the URL of a file in the field below, click Add file from URL then Upload...",
        fr: "copiez/collez l'URL d'un fichier dans le champ ci-dessous, cliquez sur Ajouter le fichier depuis l'URL, puis Télécharger",
        es: "copia/pega la URL de un archivo en el campo de abajo, haz clic en Añadir archivo desde URL y luego en Subir..."
    },
    "web search": {
        fr: "recherche web",
        es: "búsqueda web"
    },
    "take photo": {
        fr: "prendre une photo",
        es: "tomar una foto"
    },
    "#upload webcam help": {
        en: "please click on Open Webcam button to capture an image...",
        fr: "merci de cliquer sur Ouvrir la Webcam pour capturer une image...",
        es: "por favor haz clic en el botón de Abrir Webcam para capturar una imagen..."
    },
    "open webcam": {
        fr: "Ouvrir la webcam",
        es: "abrir la webcam"
    },
    "#take photo": {
        en: "click Take photo to add image",
        fr: "cliquez sur Prendre une photo pour ajouter une image",
        es: "haz clic en Tomar foto para añadir una imagen"
    },
    "#upload web search help": {
        en: "search images on the web using the search field below",
        fr: "recherchez des images sur le web via le champ de recherche ci-dessous",
        es: "busca imágenes en la web usando el campo de búsqueda de abajo"
    },
    "enter your search term and press Enter": {
        fr: "entrez votre recherche et pressez Enter",
        es: "ingresa tu término de búsqueda y presiona Enter"
    },
    "add images from Web search": {
        fr: "ajouter les images trouvées",
        es: "añadir imágenes encontradas"
    },
    "upload": {
        fr: "télécharger les fichiers",
        es: "subir archivos"
    },
    "upload %n file(s)": {
        fr: "télécharger %n fichier(s)",
        es: "subir %n archivo(s)"
    },
    "#upload drive help": {
        en: "select files from your %drive account then click on Upload...",
        fr: "sélectionnez des fichiers depuis votre compte %drive puis cliquez sur Télécharger",
        es: "selecciona archivos desde tu cuenta de %drive y luego haz clic en Subir..."
    },
    "connect to your %drive account": {
        fr: "connectez-vous à votre compte %drive",
        es: "conéctate a tu cuenta de %drive"
    },
    "#no preview": {
        en: "sorry, we can't preview this file type:",
        fr: "désolé, le navigateur ne peut pas prévisualiser ce type de fichier :",
        es: "lo siento, no podemos previsualizar este tipo de archivo:"
    },
    "deleting a file": {
        fr: "effacer un fichier",
        es: "eliminar un archivo"
    },
    "#warning delete file": {
        en: "do you really want to delete this file?",
        fr: "voulez-vous vraiment effacer ce fichier ?",
        es: "¿realmente quieres eliminar este archivo?"
    },
    "#warning file size": {
        en: "the total size of files should not exceed",
        fr: "la taille totale des fichiers ne doit pas dépasser",
        es: "el tamaño total de los archivos no debe exceder"
    },
    "#preview mode": {
        en: "side / center view",
        fr: "affichage latéral / central",
        es: "vista lateral / central"
    },

    /**
     * File library
     */
    "file library": {
        fr: "bibliothèque de fichiers",
        es: "biblioteca de archivos"
    },
    "#name": {
        en: "name",
        fr: "nom",
        es: "nombre"
    },    
    "#type": {
        en: "type",
        fr: "type",
        es: "tipo"
    },
    "#mime type": {
        en: "type",
        fr: "type",
        es: "tipo"
    },    
    "#size": {
        en: "size",
        fr: "taille",
        es: "tamaño"
    },

    /**
     * Link field
     */
    "link to another table": {
        fr: "liaison vers une autre table",
        es: "enlace a otra tabla"
    },
    "#select link": {
        en: "select",
        fr: "sélectionner",
        es: "seleccionar"
    },
    "delete a link": {
        fr: "effacer une liaison",
        es: "eliminar un enlace"
    },
    "#delete link": {
        en: "this will delete the link between the records. Do you want to do that?",
        fr: "cela va supprimer la liaison entre les fiches. Voulez-vous bien faire cela ?",
        es: "esto eliminará el enlace entre los registros. ¿Quieres hacer eso?"
    },
    "#connect records": {
        en: "connecting 2 records",
        fr: "connecter 2 données",
        es: "conectar 2 registros"
    },
    "#connect confirmation": {
        en: "are you sure you want to link this record?",
        fr: "êtes-vous sûr de vouloir connecter cette donnée ?",
        es: "¿estás seguro de que quieres enlazar este registro?"
    },
    "#link to": {
        en: "link to a record from the table:",
        fr: "lier à une donnée de la table :",
        es: "enlazar con un registro de la tabla:"
    },
    "#record already linked": {
        en: "this record is already linked",
        fr: "cette fiche est déjà liée",
        es: "este registro ya está vinculado"
    },
    "#only one link": {
        en: "you can only link a single element",
        fr: "vous ne pouvez lier qu'un seul élément",
        es: "solo puedes enlazar un único elemento"
    },
    "display as table": {
        fr: "afficher en table",
        es: "mostrar como tabla"
    },

    /**
     * Datatable
     */
    "select your fields": {
        fr: "Choisissez vos champs",
        es: "elige tus campos"
    },
    "cells": {
        fr: "cellules",
        es: "células"
    },
    "rows": {
        fr: "lignes",
        es: "filas"
    },
    "columns": {
        fr: "colonnes",
        es: "columnas"
    },
    "#display fields": {
        en: "select fields",
        fr: "sélectionner les champs",
        es: "seleccionar campos"
    },
    "add a column": {
        fr: "ajouter une colonne",
        es: "añadir una columna"
    },
    "column color": {
        fr: "couleur de la colonne",
        es: "color de la columna"
    },
    "remove color": {
        fr: "enlever la couleur",
        es: "eliminar el color"
    },
    "sort your data": {
        fr: "triez vos données",
        es: "ordena tus datos",
    },
    "to sort": {
        en: "sort",
        fr: "trier",
        es: "ordenar"
    },
    "sort by": {
        fr: "trier par",
        es: "ordenar por"
    },
    "then by": {
        fr: "puis par",
        es: "luego por"
    },
    "inverse order": {
        fr: "ordre inverse",
        es: "orden inverso"
    },
    "select a field to sort by": {
        fr: "Sélectionner le champ à trier",
        es: "selecciona un campo por el cual ordenar"
    },
    "add a subgroup": {
        fr: "ajouter un sous-groupe",
        es: "añadir un subgrupo"
    },
    "filter your data": {
        fr: "Filtrez vos données",
        es: "filtra tus datos"
    },
    "where field": {
        fr: "Où le champ",
        es: "donde el campo"
    },
    "operator": {
        fr: "Opérateur",
        es: "operador"
    },
    "comparison": {
        fr: "comparaison",
        es: "comparación"
    },
    "today": {
        fr: "aujourd'hui",
        es: "hoy"
    },
    "exact date": {
        fr: "date exacte",
        es: "fecha exacta"
    },
    "days ago": {
        fr: "il y a N jours",
        es: "hace N días"
    },
    "days from now": {
        fr: "dans N jours",
        es: "en N días"
    },
    "days": {
        fr: "jours",
        es: "días"
    },
    "value": {
        fr: "valeur",
        es: "valor"
    },
    "add a filter": {
        fr: "ajouter un filtre",
        es: "añadir un filtro"
    },
    "to filter": {
        en: "filter",
        fr: "filtrer",
        es: "filtrar"
    },
    "actions": {
        fr: "actions",
        es: "acciones"
    },
    "hide all": {
        fr: "tout cacher",
        es: "ocultar todo"
    },
    "show all": {
        fr: "tout afficher",
        es: "mostrar todo"
    },
    "expand all": {
        fr: "tout déployer",
        es: "expandir todo"
    },
    "collapse all": {
        fr: "tout condenser",
        es: "colapsar todo"
    },
    "group by": {
        fr: "grouper par",
        es: "agrupar por"
    },
    "#ftsearch title": {
        en: "current search term",
        fr: "recherche actuelle",
        es: "término de búsqueda actual"
    },
    "seriously": {
        en: "6 groups",
        fr: "6 groupes",
        es: "6 grupos"
    },
    "#too many groups": {
        en: "sorry, it's not possible to group on more than 6 fields",
        fr: "désolé, il n'est pas possible de grouper sur plus de 6 champs",
        es: "lo siento, no es posible agrupar en más de 6 campos"
    },
    "#understood": {
        en: "ok, roger that!",
        fr: "ok, compris !",
        es: "¡ok, entendido!"
    },
    "show group hierarchy": {
        fr: "afficher la hiérarchie des groupes",
        es: "mostrar la jerarquía de grupos"
    },
    "download file": {
        fr: "télécharger le fichier",
        es: "descargar archivo"
    },
    "#no links": {
        en: "this record has no links to %table",
        fr: "cette donnée n'a pas de liens vers %table",
        es: "este registro no tiene enlaces a %table"
    },
    "#summary": {
        en: "summary",
        fr: "aggrégation",
        es: "resumen"
    },
    "sum": {
        fr: "somme",
        es: "suma"
    },
    "#sum": {
        en: "sum",
        fr: "som.",
        es: "sum."
    },
    "average": {
        fr: "moyenne",
        es: "promedio"
    },
    "#avg": {
        en: "avg.",
        fr: "moy.",
        es: "prom."
    },
    "#summary sum": {
        en: "display sum",
        fr: "afficher les sommes",
        es: "mostrar sumas"
    },
    "#summary avg": {
        en: "display average",
        fr: "afficher les moyennes",
        es: "mostrar promedios"
    },
    "#no summary": {
        en: "no summary",
        fr: "pas de calculs",
        es: "sin resumen"
    },
    "sort ascending": {
        fr: "trier dans l'ordre croissant",
        es: "ordenar de forma ascendente"
    },
    "sort descending": {
        fr: "trier dans l'ordre décroissant",
        es: "ordenar de forma descendente"
    },
    "#reset view params": {
        en: "reset view",
        fr: "réinitialiser la vue",
        es: "restablecer vista"
    },
    "layout": {
        fr: "mise en page",
        es: "diseño"
    },
    "cell size": {
        fr: "taille des cellules",
        es: "tamaño de las células"
    },
    "compact": {
        fr: "compact",
        es: "compacto"
    },
    "normal": {
        fr: "normal",
        es: "normal"
    },
    "extra small": {
        fr: "très petit",
        es: "extra pequeño"
    },
    "small": {
        fr: "petit",
        es: "pequeño"
    },
    "medium": {
        fr: "moyen",
        es: "mediano"
    },
    "large": {
        fr: "grand",
        es: "grande"
    },
    "extra large": {
        fr: "très grand",
        es: "extra grande"
    },
    "tall": {
        fr: "grand",
        es: "alto"
    },
    "very tall": {
        fr: "très grand",
        es: "muy alto"
    },
    "interface size": {
        fr: "taille de l'interface",
        es: "tamaño de la interfaz"
    },
    "top": {
        fr: "haut",
        es: "arriba"
    },
    "middle": {
        fr: "milieu",
        es: "medio"
    },
    "bottom": {
        fr: "bas",
        es: "abajo"
    },
    "#realtime sync": {
        en: `<b>Real time update</b>
        <br>Warning: if you enable this feature, the view will be updated each time it is modified by you or another user`,
        fr: `<b>Mise à jour en temps réel</b>
        <br>Attention: si vous activez cette fonctionnalité, la vue sera mise à jour à chaque modification faite par vous ou un autre utilisateur`,
        es: `<b>Actualización en tiempo real</b>
        <br>Advertencia: si habilitas esta característica, la vista se actualizará cada vez que sea modificada por ti o por otro usuario`
    },
    "#quick tips": {
        en: "quick start",
        fr: "démarrage rapide",
        es: "inicio rápido"
    },
    "#replay tips": {
        en: "do you want to review these tips?",
        fr: "voulez-vous revoir ces conseils ?",
        es: "¿quieres revisar estos consejos?"
    },
    "#open link": {
        en: "open link in new tab",
        fr: "ouvrir le lien dans un nouvel onglet",
        es: "abrir enlace en nueva pestaña"
    },
    "#copy selection": {
        en: "copy selection to clipboard",
        fr: "copier la sélection dans le presse-papier",
        es: "copiar la selección en el portapapeles"
    },

    /**
     * Calendar
     */
    "january": {
        fr: "janvier",
        es: "enero"
    },
    "february": {
        fr: "février",
        es: "febrero"
    },
    "march": {
        fr: "mars",
        es: "marzo"
    },
    "april": {
        fr: "avril",
        es: "abril"
    },
    "may": {
        fr: "mai",
        es: "mayo"
    },
    "june": {
        fr: "juin",
        es: "junio"
    },
    "july": {
        fr: "juillet",
        es: "julio"
    },
    "august": {
        fr: "août",
        es: "agosto"
    },
    "september": {
        fr: "septembre",
        es: "septiembre"
    },
    "october": {
        fr: "octobre",
        es: "octubre"
    },
    "november": {
        fr: "novembre",
        es: "noviembre"
    },
    "december": {
        fr: "décembre",
        es: "diciembre"
    },
    "sunday": {
        fr: "dimanche",
        es: "domingo"
    },
    "monday": {
        fr: "lundi",
        es: "lunes"
    },
    "tuesday": {
        fr: "mardi",
        es: "martes"
    },
    "wednesday": {
        fr: "mercredi",
        es: "miércoles"
    },
    "thursday": {
        fr: "jeudi",
        es: "jueves"
    },
    "friday": {
        fr: "vendredi",
        es: "viernes"
    },
    "saturday": {
        fr: "samedi",
        es: "sábado"
    },
    "today": {
        fr: "aujourd'hui",
        es: "hoy"
    },
    "date field used": {
        fr: "champ Date utilisé",
        es: "campo Fecha usado"
    },
    "time field used": {
        fr: "champ Heure utilisé",
        es: "campo Hora usado"
    },
    "default period": {
        fr: "période par défaut",
        es: "período predeterminado"
    },
    "setup the calendar": {
        fr: "paramétrer le calendrier",
        es: "configurar el calendario"
    },
    "weeks start on monday": {
        fr: "les semaines démarrent le lundi",
        es: "las semanas comienzan el lunes"
    },
    "show week-ends": {
        fr: "afficher les week-ends",
        es: "mostrar los fines de semana"
    },
    "month": {
        fr: "mois",
        es: "mes"
    },
    "months": {
        fr: "mois",
        es: "meses"
    },
    "year": {
        fr: "année",
        es: "año"
    },
    "years": {
        fr: "années",
        es: "años"
    },
    "weeks": {
        fr: "semaines",
        es: "semanas"
    },
    "week": {
        fr: "semaine",
        es: "semana"
    },
    "details": {
        fr: "détails",
        es: "detalles"
    },

    /**
     * Kanban
     */
    "#move card": {
        en: "move to column",
        fr: "déplacer vers la colonne",
        es: "mover a la columna"
    },
    "#kanban help": {
        en: "select a field in the 'Group by' list to create the columns of your Kanban",
        fr: "choisissez un champ dans la liste 'Grouper par' pour créer les colonnes de votre Kanban",
        es: "seleccione un campo en la lista 'Agrupar por' para crear las columnas de su Kanban"
    },
    "#no category": {
        en: "without category",
        fr: "sans catégorie",
        es: "sin categoría"
    },
    "#move card": {
        en: "move to...",
        fr: "déplacer vers...",
        es: "mover a..."
    },
    "#card moved": {
        en: "card moved successfully to column",
        fr: "carte déplacée avec succès vers la colonne",
        es: "tarjeta movida exitosamente a la columna"
    },

    /**
     * Timeline
     */
    "setup the timeline": {
        fr: "paramétrer la ligne de temps",
        es: "configurar la línea de tiempo"
    },
    "#timeline start date": {
        en: "field used as the start date",
        fr: "champ pour la date de début",
        es: "campo usado como fecha de inicio"
    },
    "#timeline end date": {
        en: "field used as the end date",
        fr: "champ pour la date de fin",
        es: "campo usado como fecha de finalización"
    },
    "#timeline title field": {
        en: "field used as the title in the left column",
        fr: "champ pour le titre de la colonne de gauche",
        es: "campo usado como el título en la columna izquierda"
    },
    "#timeline period": {
        en: "default period displayed",
        fr: "période affichée par défaut",
        es: "período predeterminado mostrado"
    },
    "#timeline color field": {
        en: "field used as the color of the bars",
        fr: "champ pour la couleur des barres",
        es: "campo utilizado como color de las barras"
    },

    /**
     * Gallery
     */
    "setup the gallery": {
        fr: "paramétrer la gallerie",
        es: "configurar la galería"
    },
    "#gallery image field": {
        en: "field used as the gallery image",
        fr: "champ pour l'image de la gallerie",
        es: "campo usado como imagen de la galería"
    },
    "#gallery show image": {
        en: "do you want to display an image?",
        fr: "voulez-vous afficher une image ?",
        es: "¿quieres mostrar una imagen?"
    },          

    /**
     * Map
     */
    "setup the map": {
        fr: "paramétrer la carte",
        es: "configurar el mapa"
    },
    "#coordinates field": {
        en: "field used as the coordinates",
        fr: "champ pour les coordonnées",
        es: "campo usado como coordenadas"
    },
    "#label field": {
        en: "field used as the label for the markers",
        fr: "champ pour le libellé des marqueurs",
        es: "campo usado como etiqueta de los marcadores"
    },
    "default coordinates": {
        fr: "coordonnées par défaut",
        es: "coordenadas predeterminadas"
    },
    "#default coordinates help": {
        en: "you can enter a GPS point (e.g. 55.5,-21) or an address, city (e.g. Paris) or country to center the map",
        fr: "vous pouvez saisir un point GPS (ex: 55.5,-21) ou bien une adresse, une ville (ex: Paris) ou un pays pour centrer la carte",
        es: "puedes ingresar un punto GPS (ej: 55.5,-21) o una dirección, ciudad (ej: París) o país para centrar el mapa"
    },
    "coordinates format": {
        fr: "format des coordonnées",
        es: "formato de coordenadas"
    },
    "longitude": {
        fr: "longitude",
        es: "longitud"
    },
    "latitude": {
        fr: "latitude",
        es: "latitud"
    },
    "default zoom level": {
        fr: "niveau de zoom par défaut",
        es: "nivel de zoom predeterminado"
    },
    "#max markers": {
        en: "maximum number of markers displayed",
        fr: "nombre maximum de marqueurs affichés",
        es: "número máximo de marcadores mostrados"
    },
    "select map layer": {
        en: "select map type",
        fr: "sélectionner le type de carte",
        es: "seleccionar tipo de mapa"
    },
    "default map": {
        fr: "carte par défaut",
        es: "mapa predeterminado"
    },
    "satellite view": {
        fr: "vue satellite",
        es: "vista satelital"
    },

    /**
     * Chart
     */
    "#chart help": {
        en: "click on the settings icon to configure the chart",
        fr: "cliquez sur le menu du graphique pour le configurer",
        es: "haz clic en el menú del gráfico para configurarlo"
    },
    "#chart wrong params": {
        en: "you didn't setup the chart correctly",
        fr: "vous n'avez pas configuré le graphique correctement",
        es: "no has configurado el gráfico correctamente"
    },
    "setup the chart": {
        fr: "paramétrer le graphique",
        es: "configurar el gráfico"
    },
    "#chart type": {
        en: "type of chart",
        fr: "type de graphique",
        es: "tipo de gráfico"
    },
    "#bar chart": {
        en: "display a comparison or a trend over time, with many categories",
        fr: "afficher une comparaison ou une tendance dans le temps, avec beaucoup de catégories",
        es: "mostrar una comparación o una tendencia en el tiempo, con muchas categorías"
    },
    "#line chart": {
        en: "display a trend over time or a relationship between 2 variables",
        fr: "afficher une tendance dans le temps ou une relation entre 2 variables",
        es: "mostrar una tendencia en el tiempo o una relación entre 2 variables"
    },
    "#pie chart": {
        en: "display a comparison, with few categories",
        fr: "afficher une comparaison, avec peu de catégories",
        es: "mostrar una comparación, con pocas categorías"
    },
    "#number chart": {
        en: "display a number representing a summary",
        fr: "afficher un nombre représentant une synthèse",
        es: "mostrar un número que representa un resumen"
    },
    "legend": {
        fr: "légende",
        es: "leyenda"
    },
    "#time series": {
        en: "show a time series",
        fr: "montrer une évolution temporelle",
        es: "mostrar una evolución temporal"
    },
    "#count data": {
        en: "count data",
        fr: "compter les données",
        es: "contar los datos"
    },
    "#summarize data": {
        en: "summarize data",
        fr: "aggréger les données",
        es: "resumir los datos"
    },
    "X-axis": {
        fr: "axe X",
        es: "eje X"
    },
    "Y-axis": {
        fr: "axe Y",
        es: "eje Y"
    },
    "time axis": {
        fr: "axe temporel",
        es: "eje temporal"
    },
    "chart values": {
        fr: "valeurs du graphique",
        es: "valores del gráfico",
    },
    "#category field": {
        en: "field used as the categories",
        fr: "champ pour les catégories",
        es: "campo para las categorías"
    },
    "#summary field": {
        en: "field to summarize",
        fr: "champ à agréger",
        es: "campo a resumir"
    },
    "start at zero": {
        fr: "démarrer à zéro",
        es: "comenzar en cero"
    },
    "download chart": {
        fr: "télécharger le graphique",
        es: "descargar gráfico"
    },
    "show legend": {
        fr: "afficher la légende",
        es: "mostrar leyenda"
    },
    "show values on chart": {
        fr: "afficher les valeurs sur le graphique",
        es: "mostrar valores en el gráfico"
    },
    "show labels on chart": {
        fr: "afficher les libellés sur le graphique",
        es: "mostrar etiquetas en el gráfico"
    },
    "#center labels": {
        en: "center labels",
        fr: "centrer les libellés",
        es: "centrar etiquetas"
    },
    "legend position": {
        fr: "position de la légende",
        es: "posición de la leyenda"
    },
    "download image": {
        fr: "télécharger l'image",
        es: "descargar imagen"
    },

    /**
     * Messages to notify database mutations
     */
    "#msg insert": {
        en: "user <b> %user </b> created <b> %object </b>",
        fr: "l'utilisateur <b> %user </b> a créé <b> %object </b>",
        es: "el usuario <b> %user </b> creó <b> %object </b>"
    },
    "#msg update": {
        en: "user <b> %user </b> updated <b> %object </b>",
        fr: "l'utilisateur <b> %user </b> a mis à jour <b> %object </b>",
        es: "el usuario <b> %user </b> actualizó <b> %object </b>"
    },
    "#msg delete": {
        en: "user <b> %user </b> deleted <b> %object </b>",
        fr: "l'utilisateur <b> %user </b> a supprimé <b> %object </b>",
        es: "el usuario <b> %user </b> eliminó <b> %object </b>"
    },
    "#a record": {
        en: "a record",
        fr: "une donnée",
        es: "un registro"
    },
    "#a view": {
        en: "a view",
        fr: "une vue",
        es: "una vista"
    },
    "#a model": {
        en: "a form / table",
        fr: "un formulaire / une table",
        es: "un formulario / una tabla"
    },
    "#some data": {
        en: "some data",
        fr: "des données",
        es: "algunos datos"
    },

    /**
     * Themes
     */
    "dark": {
        fr: "sombre",
        es: "oscuro"
    },
    "light": {
        fr: "clair",
        es: "claro"
    },
    "yellow": {
        fr: "jaune",
        es: "amarillo"
    },
    "green": {
        fr: "vert",
        es: "verde"
    },
    "blue": {
        fr: "bleu",
        es: "azul"
    },
    "purple": {
        fr: "violet",
        es: "morado"
    },
    "pink": {
        fr: "rose",
        es: "rosa"
    },
    "red": {
        fr: "rouge",
        es: "rojo"
    },
    "orange": {
        fr: "orange",
        es: "naranja"
    },
    "black": {
        fr: "noir",
        es: "negro"
    },
    "gray": {
        fr: "gris",
        es: "gris"
    },
    "white": {
        fr: "blanc",
        es: "blanco"
    },
    "minimal": {
        fr: "épuré",
        es: "minimalista"
    },
    "custom": {
        fr: "personnel",
        es: "personalizado"
    },
    "default": {
        fr: "par défaut",
        es: "predeterminado"
    },
    "sharp": {
        fr: "anguleux",
        es: "anguloso"
    },
    "round": {
        fr: "arrondi",
        es: "redondeado"
    },
    "#theme builder": {
        en: "CSS theme creation",
        fr: "création de thème CSS",
        es: "creación de tema CSS"
    },
    "#download theme": {
        en: "download the theme",
        fr: "télécharger le thème",
        es: "descargar el tema personalizado"
    },
    "#load theme": {
        en: "load a theme",
        fr: "charger un thème",
        es: "cargar un tema"
    },
    "#theme name": {
        en: "theme name",
        fr: "nom du thème",
        es: "nombre del tema"
    },
    "#theme name help": {
        en: "give a name to your theme",
        fr: "donnez un nom à votre thème",
        es: "da un nombre a tu tema"
    },
    "body": {
        fr: "corps",
        es: "cuerpo"
    },
    "basic colors": {
        fr: "couleurs de base",
        es: "colores básicos"
    },
    "special backgrounds": {
        fr: "arrière-plans spéciaux",
        es: "fondos especiales"
    },
    "shadows": {
        fr: "ombres",
        es: "sombras"
    },
    "scrollbars": {
        fr: "barres de défilement",
        es: "barras de desplazamiento"
    },
    "data components": {
        fr: "composants de données",
        es: "componentes de datos"
    },
    "tabs": {
        fr: "onglets",
        es: "pestañas"
    },
    "loading": {
        fr: "chargement",
        es: "carga"
    },
    "home page": {
        fr: "page d'accueil",
        es: "página de inicio"
    },
    "fields": {
        fr: "champs",
        es: "campos"
    },
    "select fields": {
        fr: "listes déroulantes",
        es: "listas desplegables"
    },
    "panels": {
        fr: "panneaux",
        es: "paneles"
    },
    "menus": {
        fr: "menus",
        es: "menús"
    },
    "buttons": {
        fr: "boutons",
        es: "botones"
    }
}

;