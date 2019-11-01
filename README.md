# A DDNS Function

Simple Dynamic DNS with Lambda

## Configuration

The `HOSTED_ZONE_ID` env.

## Usage

```
serverless deploy
```

The output will contain the URL (end-point) and the API key. To update:

```
curl --header "x-api-key: <API_KEY>" <ENDPOINT>/production/<DOMAIN>
```

...which would look like this:

```
curl --header "x-api-key: 0000000000000000000000000000000000000000" https://0000000000.execute-api.eu-west-1.amazonaws.com/production/test.example.com.
```

...and output:

```
{"ip":"127.0.0.1"}
```

## Mikrotik

```
/tool fetch url="https://0000000000.execute-api.eu-west-1.amazonaws.com/production/test.example.com" http-header-field=x-api-key:0000000000000000000000000000000000000000
```
