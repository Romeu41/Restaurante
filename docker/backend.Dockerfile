FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY RestaurantManagement.API.csproj ./
RUN dotnet restore RestaurantManagement.API.csproj
COPY . ./
RUN dotnet publish RestaurantManagement.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RestaurantManagement.API.dll"]
