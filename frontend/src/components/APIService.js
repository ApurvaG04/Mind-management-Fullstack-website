export default class APIService {
    static UpdateJournal(id, details) {
        return fetch(`http://127.0.0.1:5000/journal/update/${id}`, {
            'method': 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        .then(resp => resp.json())
    }

    static CreateJournal(details) {
        return fetch(`http://127.0.0.1:5000/journal/write`, {
            'method': 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        .then(resp => resp.json())
    }

    static DeleteJournal(id) {
        return fetch(`http://127.0.0.1:5000/journal/delete/${id}`, {
            'method': 'DELETE',
        })
    }
}