import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}
  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;
    song.title = songDTO.title;

    const artists = await this.artistsRepository.findBy({
      id: In(songDTO.artists),
    });
    song.artists = artists;
    return await this.songsRepository.save(song);
  }
  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    // Sorting By Release date descendingly
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
  async findOne(id: number): Promise<Song> {
    return await this.songsRepository.findOneBy({ id });
  }
  async update(
    id: number,
    updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return await this.songsRepository.update(id, updateSongDTO);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }
}
