$ErrorActionPreference = "Stop";

# config

$AccountName='devstoreaccount1'
$AccountKey='Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=='

# derived config

$BlobEndpoint="http://127.0.0.1:10000/$($AccountName)"
$QueueEndpoint="http://127.0.0.1:10001/$($AccountName)"
$TableEndpoint="http://127.0.0.1:10002/$($AccountName)"

$ConnectionString = "" +
    "DefaultEndpointsProtocol=http;" + 
    "BlobEndpoint=$($BlobEndpoint);" +
    "QueueEndpoint=$($QueueEndpoint);" +
    "TableEndpoint=$($TableEndpoint);" +
    "AccountName=$($AccountName);" +
    "AccountKey=$($AccountKey)"

# authentication

$Context = New-AzureStorageContext `
    -ConnectionString $ConnectionString

# cors rules
$CorsRules = (@{
    AllowedHeaders=@("*");
    AllowedOrigins=@("*");
    ExposedHeaders=@("Content-Length");
    MaxAgeInSeconds=60*60*24;
    AllowedMethods=@("Options", "Get", "Post")
})

Set-AzureStorageCORSRule `
    -ServiceType Table `
    -Context $Context `
    -CorsRules $CorsRules

# check
Get-AzureStorageCORSRule `
    -ServiceType Table `
    -Context $Context