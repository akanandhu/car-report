import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserUtilsService } from './service/user.utils.service';
import { UserRepository } from './repository/user.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SharedUserService {
  private readonly userRepository: UserRepository;

  constructor(
    private readonly userUtilsService: UserUtilsService,
    private readonly prisma: PrismaService,
  ) {
    this.userRepository = new UserRepository(prisma);
  }

  /**
   * Register a new user
   */
  async register(data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    clientId?: string;
  }) {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      password: hashedPassword,
      clientId: data.clientId ?? null,
      mobileVerifiedAt: null,
      emailVerifiedAt: null,
    } as any);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user information
   */
  async update(
    userId: string,
    data: {
      name?: string;
      email?: string;
      mobile?: string;
      clientId?: string;
    },
  ) {
    // Check if user exists
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If email is being updated, check if it already exists
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    // Update user
    const updatedUser = await this.userRepository.update({
      where: { id: userId },
      data,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New passwords do not match');
    }

    // Get user with password
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password) {
      throw new BadRequestException('User does not have a password set');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.userRepository.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }

  /**
   * Find user by ID
   */
  async findById(userId: string) {
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * List users with pagination
   */
  async list(params: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null, // Only non-deleted users
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { mobile: { contains: search } },
      ];
    }

    // Get total count
    const total = await this.userRepository.count(where);

    // Get users
    const users = await this.userRepository.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Remove passwords from response
    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);

    return {
      data: usersWithoutPassword,
      pagination: {
        currentPage: page,
        perPage: limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }
}

