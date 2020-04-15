pubkey-collecter
=====================
[![Docker](https://github.com/mkontani/pubkey-collecter/workflows/Docker/badge.svg)](https://github.com/mkontani/pubkey-collecter/actions?query=workflow%3ADocker)
[![npm](https://img.shields.io/npm/v/pubkey-collecter)](https://www.npmjs.com/package/pubkey-collecter)
[![GitHub](https://img.shields.io/github/license/mkontani/pubkey-collecter)](https://github.com/mkontani/pubkey-collecter/blob/master/LICENSE)

🗝🦅 Collect SSH Public keys from Git Hosting Services Github, Gitlab.

- [pubkey-collecter](#pubkey-collecter)
- [General Usecase](#general-usecase)
- [Usage](#usage)
  - [Use as Container CLITOOL](#use-as-container-clitool)
  - [Use as NPM CLITOOL](#use-as-npm-clitool)
  - [Use as NPM Module](#use-as-npm-module)
- [Options](#options)
- [Customize](#customize)

# General Usecase

- Get key List
- Generate authorized_keys

# Usage

General usage

```
$ pubkey-collecter --<Options> [HostingService]:<account> ...
      Options:
        help                            show usage
        (github|gitlab|custom-service)  search as default (default: github)
        raw                             Raw string output (useful for getting authorized_keys)

e.g.) pubkey-collecter --github --raw mkontani gitlab:niconico-pun
```
- Use `--` prefix for options
- Use space separation for multiple accounts specification

See the detail below desc.

## Use as Container CLITOOL

You can run [docker container](https://hub.docker.com/r/mkontani/pubkey-collecter) like following.

```:bash
$ docker run mkontani/pubkey-collecter <your account1> <your account2> ...
{
  'github:<your account1>': [
    {
      id: 34508497,
      key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC2X8izVqnzSq61B9rLAMdqOBA2jU1QTZZF6Nu4/lS2g/8X5IMtp750m4pEyimxe8FAQsXv7eJUupfUYxhXStDtX/77KAeV9T0qKdnduX/ZH4ugf7wQshRuz4sJFPkNW1GZyTUAlkNuJnHlqaRqn/8MHcDD3NWHM1QgdTP5Jrg+XO1V28kbBRIP5gcSCGgE4HLdJ9zFrc/aRLxzzXTvlN+shcOHX0NcqJEgEAV6Z7O+R8j5tOkYAJPxW9lhBqDFvxWdaLSHPIdDpb8IgtMpIlsgRWhjM0PcHmNBM00tvxWDr7Fc5xOwhFrVFcgmwEU4fZktis9Sz8W1+gsxGw1+mEc0S9rl0GVhOHOvslTFHv7KAYGWY5++Lb3kZwGCf2f5Uvgswc7XcbxyzVm7pLDHwBF4sVl3wvAI8sUanJWUGS59OgkLwDWqH97+AwRlOvQnK+K3kK98Lk/7OzL7E+qRnoFuSIQfZo2MyNjxs+R08I7SdR/xDLBc2OP5IgSyN97PNsRc3YwQdMkw/un5j/J3Mj2pEVJjaZL3k4g+cdD9UJ12ZZFkW5JIwfYMrACFlijfOpPfQjd/z+5g+LbmL7QadHcq/K4kJscHGUKk7u97aZEWvOziRF62wVjgG79Npw1ROwtMnnWWrYLhxbMb+Tpys17SVwXsUFfA3mjMLiIEtcD6RQ=='
    }
  ],
  'github:<your account2>': [
    {
      id: 34508501,
      key: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC2X8izVqnzSq61B9rLAMdqOBA2jU1QTZZF6Nu4/lS2g/8X5IMtp750m4pEyimxe8FAQsXv7eJUupfUYxhXStDtX/77KAeV9T0qKdnduX/ZH4ugf7wQshRuz4sJFPkNW1GZyTUAlkNuJnHlqaRqn/8MHcDD3NWHM1QgdTP5Jrg+XO1V28kbBRIP5gcSCGgE4HLdJ9zFrc/aRLxzzXTvlN+shcOHX0NcqJEgEAV6Z7O+R8j5tOkYAJPxW9lhBqDFvxWdaLSHPIdDpb8IgtMpIlsgRWhjM0PcHmNBM00tvxWDr7Fc5xOwhFrVFcgmwEU4fZktis9Sz8W1+gsxGw1+mEc0S9rl0GVhOHOvslTFHv7KAYGWY5++Lb3kZwGCf2f5Uvgswc7XcbxyzVm7pLDHwBF4sVl3wvAI8sUanJWUGS59OgkLwDWqH97+AwRlOvQnK+K3kK98Lk/7OzL7E+qRnoFuSIQfZo2MyNjxs+R08I7SdR/xDLBc2OP5IgSyN97PNsRc3YwQdMkw/un5j/J3Mj2pEVJjaZL3k4g+cdD9UJ12ZZFkW5JIwfYMrACFlijfOpPfQjd/z+5g+LbmL7QadHcq/K4kJscHGUKk7u97aZEWvOziRF62wVjgG79Npw1ROwtMnnWWrYLhxbMb+Tpys17SVwXsUFfA3mjMLiIEtcD6RQ=='
    }
  ]
  ...
}
```

If you can get OpenSSH authorized_keys format, add `--raw` option like below.

```
$ docker run mkontani/pubkey-collecter --raw <your account1> <your account2> ...
# github:<your account1>
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC2X8izVqnzSq61B9rLAMdqOBA2jU1QTZZF6Nu4/lS2g/8X5IMtp750m4pEyimxe8FAQsXv7eJUupfUYxhXStDtX/77KAeV9T0qKdnduX/ZH4ugf7wQshRuz4sJFPkNW1GZyTUAlkNuJnHlqaRqn/8MHcDD3NWHM1QgdTP5Jrg+XO1V28kbBRIP5gcSCGgE4HLdJ9zFrc/aRLxzzXTvlN+shcOHX0NcqJEgEAV6Z7O+R8j5tOkYAJPxW9lhBqDFvxWdaLSHPIdDpb8IgtMpIlsgRWhjM0PcHmNBM00tvxWDr7Fc5xOwhFrVFcgmwEU4fZktis9Sz8W1+gsxGw1+mEc0S9rl0GVhOHOvslTFHv7KAYGWY5++Lb3kZwGCf2f5Uvgswc7XcbxyzVm7pLDHwBF4sVl3wvAI8sUanJWUGS59OgkLwDWqH97+AwRlOvQnK+K3kK98Lk/7OzL7E+qRnoFuSIQfZo2MyNjxs+R08I7SdR/xDLBc2OP5IgSyN97PNsRc3YwQdMkw/un5j/J3Mj2pEVJjaZL3k4g+cdD9UJ12ZZFkW5JIwfYMrACFlijfOpPfQjd/z+5g+LbmL7QadHcq/K4kJscHGUKk7u97aZEWvOziRF62wVjgG79Npw1ROwtMnnWWrYLhxbMb+Tpys17SVwXsUFfA3mjMLiIEtcD6RQ==
...

// e.g.) add to authorized_keys
$ docker run mkontani/pubkey-collecter --raw <your account1> <your account2> ... >> $PWD/.ssh/authorized_keys
```

## Use as NPM CLITOOL

```:bash
// install cli
$ npm install -g pubkey-collecter

// or install locally
$ npm install pubkey-collecter


// exec (same as container case)
$ pubkey-collecter <youraccount1> <youraccount2>

// or exec locally
$ ./node_module/.bin/pubkey-collecter <youraccount1> <youraccount2>
```

## Use as NPM Module

```:bash
// import module
const { collect, parseRaw } = require('pubkey-collecter')

// get pubkeyList
const pubkeys = await collect(['github:octcat', 'gitlab:youraccount'])
console.log(pubkeys) // output is the same as abobe docker case

// get rawString
const pubRaw = parseRaw(pubkeys)
console.log(pubRaw) // output is the same as abobe docker case
```

# Options

|option|desc|
|:--:|:--|
|--help| Show usage |
|--github|Search `github` service as default (used as default)|
|--gitlab|Search `github` service as default |
|--(custom Hosting Service)|Search custom Service as default (see detail [customize section](#customize))|
|--raw| Raw string output (useful for getting authorized_keys)|


# Customize

You can customize hosting services by adding `hosting.json` like following.
Set `{id}` as account(id) part.

```:json

    "custom-service1":{
        "api": "https://custom1.github.com/api/v4/users/{id}/keys"
    },
    "custom-service2":{
        "api": "https://custom2.github.com/api/v4/users/{id}/keys"
    },

```

After editting `hosting.json`, you can specify like below.

```
// set default search option
$ pubkey-collecter --custom-service1 mkontani

// or specify prefix
$ pubkey-collecter custom-service2:mkontani
```

You can set custom config file path by setting `HOSTING_CONF` env.
