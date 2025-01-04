<?php

namespace DaleZ\IdentityAgent;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use DaleZ\IdentityAgent\Access\UserPolicy;
use Flarum\User\User;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attribute('canUseFeature', function (UserSerializer $serializer, User $user) {
            return $serializer->getActor()->can('useFeature', $user);
        }),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),

    new Extend\Locales(__DIR__.'/locale'),
];
