global using System.ComponentModel.DataAnnotations;
global using System.IdentityModel.Tokens.Jwt;
global using System.Net;
global using System.Security.Claims;
global using System.Text;
global using System.Text.Json;

global using AutoMapper;

global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Mvc.Versioning;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.OpenApi.Models;

global using MongoDB.Bson;

global using Swashbuckle.AspNetCore.SwaggerGen;

global using TestingDemo.API.Dtos;
global using TestingDemo.API.Dtos.Auth;
global using TestingDemo.API.Dtos.Users;
global using TestingDemo.API.Filters;
global using TestingDemo.API.Middleware;
global using TestingDemo.API.Startup;
global using TestingDemo.API.Validation;
global using TestingDemo.Core.DependencyInjection;
global using TestingDemo.Core.Exceptions;
global using TestingDemo.Core.Interfaces;
global using TestingDemo.Core.Models;
global using TestingDemo.Core.Services;
global using TestingDemo.Infrastructure.Data.Mongo;
global using TestingDemo.Infrastructure.DependencyInjection;
global using TestingDemo.Infrastructure.Providers.Email.SendGrid;
