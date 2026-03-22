/**
 * Authentication logic for Python Programming Lecture Notes
 */

const Auth = {
    // Check if user is authenticated
    check: function() {
        const authData = localStorage.getItem('python_lecs_auth');
        if (!authData) {
            // Not logged in, redirect to login page
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage !== 'login.html') {
                window.location.href = 'login.html';
            }
            return false;
        }
        
        const data = JSON.parse(authData);
        // If admin, unlock everything regardless of config
        if (data.role === 'admin') {
            LECTURE_CONFIG.enableAll = true;
        }
        return true;
    },

    // Perform login
    login: function(password) {
        let role = null;
        if (password === LECTURE_AUTH.adminPassword) {
            role = 'admin';
        } else if (password === LECTURE_AUTH.studentPassword) {
            role = 'student';
        }

        if (role) {
            localStorage.setItem('python_lecs_auth', JSON.stringify({
                role: role,
                timestamp: new Date().getTime()
            }));
            window.location.href = 'index.html';
            return true;
        }
        return false;
    },

    // Logout
    logout: function() {
        localStorage.removeItem('python_lecs_auth');
        window.location.href = 'login.html';
    }
};

// Auto-check on script load (except on login page)
if (window.location.pathname.split('/').pop() !== 'login.html') {
    Auth.check();
}
