global using System.ComponentModel.DataAnnotations;
global using System.Net;
global using System.Security.Cryptography;
global using System.Text;
global using System.Text.Json;

global using AutoMapper;

global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Mvc.Versioning;
global using Microsoft.Extensions.Options;
global using Microsoft.IdentityModel.Tokens;

global using MongoDB.Bson;

global using TestingDemo.API.Dtos;
global using TestingDemo.API.Dtos.Auth;
global using TestingDemo.API.Dtos.Users;
global using TestingDemo.API.Middleware;
global using TestingDemo.API.Models;
global using TestingDemo.API.Services;
global using TestingDemo.API.Validation;
global using TestingDemo.Core.Exceptions;
global using TestingDemo.Core.Interfaces;
global using TestingDemo.Core.Models;
global using TestingDemo.Core.Services;
global using TestingDemo.Infrastructure.Data.Mongo;
global using TestingDemo.Infrastructure.Data.Mongo.Repositories;
global using TestingDemo.Infrastructure.Providers.Email.SendGrid;
