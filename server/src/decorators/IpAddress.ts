import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { Request } from 'express';

export const IpAddress = createParamDecorator((
    data: unknown,
    ctx: ExecutionContext,
) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    let ip = requestIp.getClientIp(request) || '';

    // Chuyển đổi IPv4-mapped IPv6 thành IPv4
    if (ip.startsWith('::ffff:')) {
        ip = ip.replace('::ffff:', '');
    }

    return ip;
})