import app from 'flarum/admin/app';

app.initializers.add('dalez-identityagent', () => {
    app.extensionData.for('dalez-identityagent').registerPermission(
        {
            allowGuest: false,
            icon: 'fas fa-user-secret',
            label: app.translator.trans('dalez-identityagent.admin.can_use_feature'),
            permission: 'user.useFeature',
        },
        'start'
    );
});
