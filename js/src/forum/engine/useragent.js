export default (() => {
    let token, originalUser;
    const requestOld = app.request;

    function startActing(tokenString, userID) {
        token = tokenString;
        originalUser = userID;
        app.request = (options) => {
            let optionsWithToken = { ...options };
            optionsWithToken.headers = optionsWithToken.headers || {};
            optionsWithToken.headers.Authorization = `Token ${token}`;
            return requestOld.call(window.app, optionsWithToken);
        };
    }

    async function stopActing() {
        await loadBaseApiData();
        app.session.user = originalUser;
        app.request = requestOld.bind(window.app);
        app.acting = false;
        m.redraw();
    }

    /**
     * Hits the API endpoint by calling `app.store.find('')`, which will load
     * all initial data that the user should have set.
     */
    async function loadBaseApiData() {
        await app.store.find('');
    }

    /**
     * Hides the provided modal, and calls the `loaded` method on that modal.
     */
    function closeModal(modalInstance) {
        modalInstance.hide();
        modalInstance.loaded?.call(modalInstance);
    }

    function trans(key) {
        return app.translator.trans(`dalez-identityagent.forum.${key}`);
    }

    return {
        startActing,
        stopActing,
        loadBaseApiData,
        closeModal,
        trans
    };
})();