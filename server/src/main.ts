import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {swaggerConfig} from './config/SwaggerConfig';
import {ValidationPipe} from '@nestjs/common';
import {UsersService} from '@/modules/users/users.service';
import {PassportOAuthConfig} from '@/authentication/google_oauth2/google-passport.config';
import session from 'express-session';
import passport from 'passport';
import { join } from 'path';
import * as requestIp from 'request-ip';
import * as express from 'express';
import cookieParser from 'cookie-parser';
import {SeedService} from "@/database/seeds/seed.service";
import { AllExceptionsFilter } from '@/config/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const usersService = app.get(UsersService);
  const port = configService.get('PORT');

  // Using request-ip middleware
  app.use(requestIp.mw());

  // Apply cookie parser to access cookies from request
  app.use(cookieParser());

  // Config CORS
  app.enableCors({
    origin: true,
    methods: 'GET , HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    credentials: true,
  });

  // Using express-session for OAuth2
  app.use(
    session({
      secret: configService.get('EXPRESS_SESSION_KEY'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Out of date after 1 hour
    }),
  );

  // Apply passport config to server
  const passportOAuth = new PassportOAuthConfig(usersService);
  passportOAuth.configure();

  app.use(passport.initialize());
  app.use(passport.session());

  // Apply all ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Serve static files in "uploads" folder at "/uploads" path
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  // Swagger
  swaggerConfig(app);

  // Seeding data
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  await app.listen(port ?? 8081);
}

bootstrap();
