describe('localStorage tests', () => {

    beforeEach(() => {

      

        global.localStorage = {

            store: {},

            setItem(key, value) { this.store[key] = value; },

            getItem(key) { return this.store[key] || null; },

            clear() { this.store = {}; }

        };

    });

    test('saves user to localStorage on login', () => {

        const user = { username: 'testuser', email: 'test@test.com' };

        localStorage.setItem('user', JSON.stringify(user));

        const saved = JSON.parse(localStorage.getItem('user'));

        expect(saved.username).toBe('testuser');

    });

    test('returns null if no user in localStorage', () => {

        const user = localStorage.getItem('user');

        expect(user).toBeNull();

    });

});
 