const API_URL = 'http://localhost:3000/api';

async function testAuth() {
    try {
        console.log('Testing Company Login...');
        try {
            const res = await fetch(`${API_URL}/auth/login/company`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            });
            const data = await res.json();
            console.log('Company Login Response:', res.status, data);
        } catch (e) {
            console.log('Company Login Error:', e.message);
        }

        console.log('Testing User Login...');
        try {
            const res = await fetch(`${API_URL}/auth/login/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                })
            });
            const data = await res.json();
            console.log('User Login Response:', res.status, data);
        } catch (e) {
            console.log('User Login Error:', e.message);
        }

    } catch (e) {
        console.error('Test failed:', e);
    }
}

testAuth();
