import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
} from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer-core';
import * as fs from 'fs';

const CHROMIUM_EXECUTABLE_CANDIDATES = [
  process.env.CHROMIUM_EXECUTABLE_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].filter(Boolean) as string[];

@Injectable()
export class ReportBrowserService implements OnModuleDestroy {
  private browser?: Browser;

  async getBrowser() {
    if (this.browser?.connected) {
      return this.browser;
    }

    this.browser = await puppeteer.launch({
      executablePath: this.resolveExecutablePath(),
      headless: true,
      args: [
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--no-zygote',
      ],
    });

    return this.browser;
  }

  async onModuleDestroy() {
    if (this.browser?.connected) {
      await this.browser.close();
    }
  }

  private resolveExecutablePath() {
    const executablePath = CHROMIUM_EXECUTABLE_CANDIDATES.find((candidate) =>
      fs.existsSync(candidate),
    );

    if (!executablePath) {
      throw new InternalServerErrorException(
        'Chromium executable was not found. Set CHROMIUM_EXECUTABLE_PATH or install chromium in the runtime image.',
      );
    }

    return executablePath;
  }
}
