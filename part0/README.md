<!-- Exercise 0.4 - New note diagram -->

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST (User input) -> studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: URL redirect -> studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css - CSS file
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp//exampleapp/main.js
    activate server
    server-->>browser: main.js - JavaScript file
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp//exampleapp/data.json
    activate server
    server-->>browser: data.json - all JSON data (every note)
    deactivate server

<!-- Exercise 0.5 - Single page app Diagram -->

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css - CSS file
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: spa.js - JavaScript file
    deactivate server

    browser->>server: GET -> studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data - [{content:"..." date:"..."}]
    deactivate server

<!-- Exercise 0.6 - Single page Diagram -->

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST (JSON Data) {content:"" date:""} -> studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status code 201 - Created
    deactivate server
