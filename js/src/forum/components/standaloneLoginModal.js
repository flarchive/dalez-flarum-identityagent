import LogInModal from 'flarum/forum/components/LogInModal';
import userAgent from '../engine/userAgent';

// Only for preventing pollution
export default class extends LogInModal {
    constructor() {
        super();
    }

    title() {
        return userAgent.trans('login.title');
    }

    footer() {
        return (
            <>
                <p>{userAgent.trans('login.note')}</p>
            </>
        );
    }

    view() {
        if (app.newLogin) {
            delete app.newLogin;
        }
        return super.view();
    }

    fields() {
        const items = super.fields();
        items.remove('remember');
        return items;
    }

    async onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        const loginData = this.loginParams();

        const response = await app.request({
            method: 'POST',
            url: `${app.forum.attribute('baseUrl')}/api/token`,
            body: loginData,
            errorHandler: this.onerror.bind(this),
        });

        if (!response) return;

        const { token, userId } = response;

        userAgent.startActing(token, app.session.user);

        await userAgent.loadBaseApiData();

        app.session.user = app.store.getById('users', userId);
        app.acting = true;

        userAgent.closeModal(this);
    }

    onerror(error) {
        super.onerror(error);
        this.loading = false;
    }
}
