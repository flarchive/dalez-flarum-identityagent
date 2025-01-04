<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace DaleZ\IdentityAgent\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{

    /**
     * @param User $actor
     * @param User $user
     * @return bool|null
     */
    public function useFeature(User $actor, User $user)
    {
        if ($actor->id === $user->id && $actor->hasPermission('user.useFeature')) {
            return $this->allow();
        }
    }
}