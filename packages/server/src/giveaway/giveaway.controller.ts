import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateGiveawayDto } from './dto/create-giveaway.dto';
import { EnterGiveawayDto } from './dto/enter-giveaway.dto';
import { UpdateGiveawayDto } from './dto/update-giveaway.dto';
import { GiveawayService } from './giveaway.service';

@Controller('giveaway')
@ApiTags('Giveaway')
export class GiveawayController {
  constructor(private readonly giveawayService: GiveawayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a giveaway' })
  createGiveaway(@Body() dto: CreateGiveawayDto) {
    return this.giveawayService.createGiveaway(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all giveaways' })
  findAllGiveaways() {
    return this.giveawayService.findAllGiveaways();
  }

  @Get('/:giveawayId')
  @ApiOperation({ summary: 'Find a specific giveaway' })
  findGiveaway(@Param('giveawayId', ParseIntPipe) giveawayId: number) {
    return this.giveawayService.findGiveaway(giveawayId);
  }

  @Put('/:giveawayId')
  @ApiOperation({ summary: 'Update a specific giveaway' })
  updateGiveaway(@Param('giveawayId', ParseIntPipe) giveawayId: number, @Body() dto: UpdateGiveawayDto) {
    return this.giveawayService.updateGiveaway(giveawayId, dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove all giveaways' })
  removeAllGiveaways() {
    return this.giveawayService.removeAllGiveaways();
  }

  @Delete('/:giveawayId')
  @ApiOperation({ summary: 'Remove a specific giveaway' })
  removeGiveaway(@Param('giveawayId', ParseIntPipe) giveawayId: number) {
    return this.giveawayService.removeGiveaway(giveawayId);
  }

  @Post('/:giveawayId/entry')
  @ApiOperation({ summary: 'Enter a giveaway' })
  enterGiveaway(
    @Param('giveawayId', ParseIntPipe) giveawayId: number,
    @Body() giveawayEntryDto: EnterGiveawayDto,
  ) {
    return this.giveawayService.enterGiveaway(giveawayId, giveawayEntryDto);
  }

  @Get('/:giveawayId/entry')
  @ApiOperation({ summary: 'Find all giveaway entries for a specific giveaway' })
  findAllGiveawayEntries(@Param('giveawayId', ParseIntPipe) giveawayId: number) {
    return this.giveawayService.findAllGiveawayEntries(giveawayId);
  }

  @Get('/entry/:entryId')
  @ApiOperation({ summary: 'Find a specific giveaway entry' })
  findGiveawayEntry(@Param('entryId', ParseIntPipe) entryId: number) {
    return this.giveawayService.findGiveawayEntry(entryId);
  }

  @Delete(':giveawayId/entry')
  @ApiOperation({ summary: 'Remove all giveaway entries for a specific giveaway' })
  removeAllGiveawayEntries(@Param('giveawayId', ParseIntPipe) giveawayId: number) {
    return this.giveawayService.removeAllGiveawayEntries(giveawayId);
  }

  @Delete('/entry/:entryId')
  @ApiOperation({ summary: 'Remove a specific giveaway entry' })
  removeGiveawayEntry(@Param('entryId', ParseIntPipe) entryId: number) {
    return this.giveawayService.removeGiveawayEntry(entryId);
  }
}
