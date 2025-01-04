import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import standaloneLoginModal from './components/standaloneLoginModal';
import userAgent from './engine/userAgent';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import Button from 'flarum/common/components/Button';

app.initializers.add('dalez-identityagent', () => {
    const userData = data.resources.find((element) => {
        return element.type === 'users' && data.session.userId == element.id;
    }).attributes;

    if (userData.canUseFeature)
        extend(HeaderSecondary.prototype, 'items', function (items) {
            items.add(
                'nightmode',
                <Button
                    className="Button Button--flat"
                    onclick={() => {
                        if (app.acting === true) {
                            if (window.confirm(userAgent.trans('confirmation'))) userAgent.stopActing();
                        } else app.modal.show(standaloneLoginModal);
                    }}
                    icon={app.acting === true ? 'fas fa-user-cog' : 'fas fa-user'}
                >
                    {userAgent.trans('button_text')}
                </Button>,
                15
            );
        });
});
